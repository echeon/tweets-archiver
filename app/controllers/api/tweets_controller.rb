class Api::TweetsController < ApplicationController
  def search
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV['CONSUMER_KEY']
      config.consumer_secret     = ENV['CONSUMER_SECRET']
      config.access_token        = ENV['YOUR_ACCESS_TOKEN']
      config.access_token_secret = ENV['YOUR_ACCESS_SECRET']
    end

    result = client.search(search_query, search_option)

    render json: result
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
end
