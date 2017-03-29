require 'csv'
require 'date'

class Api::TweetsController < ApplicationController
  def search
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['CONSUMER_KEY']
      config.consumer_secret     = ENV['CONSUMER_SECRET']
    end

    response = client.search(search_query, search_option)

    result = response.to_a.map { |r| r.to_h.deep_symbolize_keys }
    data = format_data(result, columns)
    render json: data
  end

  def download
    send_file Rails.root.join('app', 'views', 'api', 'index.xls.erb'), :type => "application/vnd.ms-excel", :filename => "data.xls"
  end

  def search_query
    params.require(:query)
  end

  def search_option
    {
      # geocode: '37.781157,-122.398720,1mi', # lat,long,radius(3mi)(5km)
      # lang: 'en',
      # result_type: 'mixed', # 'mixed' (default), 'recent', 'popular'
      # count: 100, #number of tweets to return per page
      # until: 'yyyy-mm-dd',
      # since_id: 0, #integer,
      # max_id: 0, #integer
    }
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
      Date.parse(v).strftime('%F')
    end
  end

  def get_time(*accessor)
    Proc.new do |data|
      v = accessor.reduce(data) { |acc, k| acc[k] }
      Date.parse(v).strftime('%I:%M %p')
    end
  end

  def get_value(*accessor)
    Proc.new do |data|
      accessor.reduce(data) { |acc, k| acc[k] }
    end
  end

end
