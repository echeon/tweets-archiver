require 'csv'
require 'time'

class Api::TweetsController < ApplicationController
  def fetch_tweets(search_query, search_option)
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['CONSUMER_KEY']
      config.consumer_secret     = ENV['CONSUMER_SECRET']
    end
    # now = Time.now
    response = client.search(search_query, search_option)
    result = response.to_a.map { |r| r.to_h.deep_symbolize_keys }
    format_data(result, columns)
  end

  def search
    data = fetch_tweets(params[:query], search_option)
    render json: data
  end

  def download
    tweets = fetch_tweets(params[:query], search_option)
    @data = JSON.parse(tweets)

    respond_to do |format|
       format.xlsx {render xlsx: 'download', :type => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename: "search-results-#{Time.now().strftime('%Y%m%d%H%M%S%L')}.xlsx"}
    end
  end

  def search_option
    hash = {
      # geocode: '40.705342,-74.012035,5mi', # lat,long,radius(3mi)(5km)
      lang: 'en',
      # result_type: 'mixed', # 'mixed' (default), 'recent', 'popular'
      count: 100, #number of tweets to return per page
      # until: 'yyyy-mm-dd',
      # since_id: 0, #integer,
      # max_id: 0, #integer
    }
    hash.merge!({geocode: params[:geocode]}) if params[:geocode]
    debugger
    hash
  end

  def format_data(data, columns)
    data.map do |d|
      columns.reduce({}) do |acc, column|
        acc[column[:column_name]] = column[:accessor].call(d)
        acc
      end
    end.to_json
  end

  def columns
    [
      {
        column_name: :date_created,
        accessor: get_date(:created_at)
      },
      {
        column_name: :time_created,
        accessor: get_time(:created_at)
      },
      {
        column_name: :screen_name,
        accessor: get_value(:user, :screen_name)
      },
      {
        column_name: :user_name,
        accessor: get_value(:user, :name)
      },
      {
        column_name: :tweet,
        accessor: get_value(:text)
      },
      {
        column_name: :tweet_id,
        accessor: get_value(:id_str)
      },
      {
        column_name: :number_retweets,
        accessor: get_value(:retweet_count)
      },
      {
        column_name: :number_followers,
        accessor: get_value(:user, :followers_count)
      },
      {
        column_name: :number_follows,
        accessor: get_value(:user, :friends_count)
      },
      {
        column_name: :number_favorites,
        accessor: get_value(:user, :favourites_count)
      },
      {
        column_name: :member_since,
        accessor: get_date(:user, :created_at)
      },
      {
        column_name: :user_location,
        accessor: get_value(:user, :location)
      },
      {
        column_name: :user_description,
        accessor: get_value(:user, :description)
      },
      {
        column_name: :verified,
        accessor: get_value(:user, :verified)
      }
    ]
  end

  def get_date(*accessor)
    Proc.new do |data|
      v = accessor.reduce(data) { |acc, k| acc[k] }
      Time.parse(v).strftime('%F')
    end
  end

  def get_time(*accessor)
    Proc.new do |data|
      v = accessor.reduce(data) { |acc, k| acc[k] }
      Time.parse(v).strftime('%H:%M:%S')
    end
  end

  def get_value(*accessor)
    Proc.new do |data|
      accessor.reduce(data) { |acc, k| acc[k] }
    end
  end

end
