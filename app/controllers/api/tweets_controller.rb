class Api::TweetsController < ApplicationController
  def search
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "Dl0EU13B6ecJxDyiDl0NXNGkW"
      config.consumer_secret     = "xixpTPbV1BlMWWO8jhx4nO3sxYoloQDjlkdB1x2Sq6ISXOJ4qx"
      config.access_token        = "845455556500471808-9YsN2Lmh7MskuYZNJ46RAiweDrhoA6G"
      config.access_token_secret = "WsmMCc8Sw1kNIzKqvktzUSk6044uL9kygRaBTDbvs1Oxu"
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
