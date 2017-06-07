require 'csv'
require 'time'

class Api::TweetsController < ApplicationController
  include ActionController::Live

  def search
    @client = TwitterSearch::Client.new

    response.headers['Content-Type'] = 'text/event-stream'
    sse = SSE.new(response.stream, event: params[:channel])

    begin
      repeat_search = true
      max_id = nil
      while repeat_search
        search_params = generate_search_params(max_id)
        search_result = @client.search(search_params)

        if search_result
          repeat_search = false if search_result['statuses'].length < 100
          max_id = search_result['statuses'].map { |t| t['id_str'].to_i }.min - 1
          sse.write({
            options: search_params,
            status: search_result['statuses'].length < 100 ? 'DONE' : 'IN_PROGRESS',
            tweets: search_result['statuses']
          })
        else
          repeat_search = false
          sse.write({
            options: search_params,
            status: 'DONE',
            tweets: []
          })
        end
      end
    rescue IOError
    rescue ClientDisconnected
    ensure
      sse.close
    end
  end

  private

  def generate_search_params(max_id)
    # {
    #   q: 'asdf',
    #   geocode: '1,1,1mi',
    #   lang: 'en',
    #   count: 100,
    #   until: '2015-07-18',
    #   since_id: 12345,
    #   max_id: 12345,
    # }
    options = {
      q: params[:q],
      lang: 'en',
      count: 100
    }
    options[:until]   = params[:until]   if params[:until]
    options[:geocode] = params[:geocode] if params[:geocode]
    options[:max_id]  = max_id           if max_id
    options
  end

  # def fetch_tweets(search_query, search_option)
  #   client = Twitter::REST::Client.new do |config|
  #     config.consumer_key        = ENV['CONSUMER_KEY']
  #     config.consumer_secret     = ENV['CONSUMER_SECRET']
  #   end
  #   debugger
  #   result = client.search(search_query, search_option)
  #   result
  # end
  #
  # def stream
  #   client = Twitter::Streaming::Client.new do |config|
  #     config.consumer_key        = ENV['CONSUMER_KEY']
  #     config.consumer_secret     = ENV['CONSUMER_SECRET']
  #     config.access_token        = ENV['ACCESS_TOKEN']
  #     config.access_token_secret = ENV['ACCESS_TOKEN_SECRET']
  #   end
  #   # client.filter(locations: "-122.75,36.8,-121.75,37.8") do |tweet|
  #   #   # puts tweet.text
  #   #   pp tweet.to_h
  #   # end
  # end
  #
  # def search
  #   data = fetch_tweets(params[:query], search_option)
  #   render json: data
  # end
  #
  # def download
  #   response = fetch_tweets(params[:query], search_option)
  #   result = response.to_a.map { |r| r.to_h.deep_symbolize_keys }
  #   # puts "*************"
  #   # puts result.length
  #   # puts "*************"
  #   tweets = format_data(result, columns)
  #   @data = JSON.parse(tweets)
  #
  #   respond_to do |format|
  #      format.xlsx {render xlsx: 'download', :type => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", filename: "search-results-#{Time.now().strftime('%Y%m%d%H%M%S%L')}.xlsx"}
  #   end
  # end
  #
  # def send_email
  #   data = fetch_tweets(params[:query], search_option)
  #   @data = JSON.parse(tweets)
  #   TestMailer.sample_email(@data).deliver_now
  # end
  #
  # def search_option
  #   hash = {
  #     # geocode: '40.705342,-74.012035,5mi', # lat,long,radius(3mi)(5km)
  #     lang: 'en',
  #     # result_type: 'mixed', # 'mixed' (default), 'recent', 'popular'
  #     count: 100, #number of tweets to return per page
  #     # until: 'yyyy-mm-dd',
  #     # since_id: 0, #integer,
  #     # max_id: 0, #integer
  #   }
  #   hash.merge!({geocode: params[:geocode]}) if params[:geocode]
  #   hash
  # end
  #
  # def format_data(data, columns)
  #   data.map do |d|
  #     columns.reduce({}) do |acc, column|
  #       acc[column[:column_name]] = column[:accessor].call(d)
  #       acc
  #     end
  #   end.to_json
  # end
  #
  # def columns
  #   [
  #     {
  #       column_name: :date_created,
  #       accessor: get_date(:created_at)
  #     },
  #     {
  #       column_name: :time_created,
  #       accessor: get_time(:created_at)
  #     },
  #     {
  #       column_name: :screen_name,
  #       accessor: get_value(:user, :screen_name)
  #     },
  #     {
  #       column_name: :user_name,
  #       accessor: get_value(:user, :name)
  #     },
  #     {
  #       column_name: :tweet,
  #       accessor: get_value(:text)
  #     },
  #     {
  #       column_name: :tweet_id,
  #       accessor: get_value(:id_str)
  #     },
  #     {
  #       column_name: :number_retweets,
  #       accessor: get_value(:retweet_count)
  #     },
  #     {
  #       column_name: :number_followers,
  #       accessor: get_value(:user, :followers_count)
  #     },
  #     {
  #       column_name: :number_follows,
  #       accessor: get_value(:user, :friends_count)
  #     },
  #     {
  #       column_name: :number_favorites,
  #       accessor: get_value(:user, :favourites_count)
  #     },
  #     {
  #       column_name: :member_since,
  #       accessor: get_date(:user, :created_at)
  #     },
  #     {
  #       column_name: :user_location,
  #       accessor: get_value(:user, :location)
  #     },
  #     {
  #       column_name: :user_description,
  #       accessor: get_value(:user, :description)
  #     },
  #     {
  #       column_name: :verified,
  #       accessor: get_value(:user, :verified)
  #     }
  #   ]
  # end
  #
  # def get_date(*accessor)
  #   Proc.new do |data|
  #     v = accessor.reduce(data) { |acc, k| acc[k] }
  #     Time.parse(v).strftime('%F')
  #   end
  # end
  #
  # def get_time(*accessor)
  #   Proc.new do |data|
  #     v = accessor.reduce(data) { |acc, k| acc[k] }
  #     Time.parse(v).strftime('%H:%M:%S')
  #   end
  # end
  #
  # def get_value(*accessor)
  #   Proc.new do |data|
  #     accessor.reduce(data) { |acc, k| acc[k] }
  #   end
  # end

end
