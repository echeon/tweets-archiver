class Api::TweetsController < ApplicationController
  # def create
  #   @user = User.find_by_credentials(
  #     params[:user][:email],
  #     params[:user][:password]
  #   )
  #
  # end


  def search
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = "Dl0EU13B6ecJxDyiDl0NXNGkW"
      config.consumer_secret     = "xixpTPbV1BlMWWO8jhx4nO3sxYoloQDjlkdB1x2Sq6ISXOJ4qx"
      config.access_token        = "845455556500471808-9YsN2Lmh7MskuYZNJ46RAiweDrhoA6G"
      config.access_token_secret = "WsmMCc8Sw1kNIzKqvktzUSk6044uL9kygRaBTDbvs1Oxu"
    end

    result = client.search(search_query, search_params)

    render json: result
  end

  def search_query
    "to:justinbieber marry"
=begin

    Operator	                            Finds Tweets...
    watching now	                        containing both “watching” and “now”. This is the default operator.
    “happy hour”	                        containing the exact phrase “happy hour”.
    love OR hate	                        containing either “love” or “hate” (or both).
    beer -root	                          containing “beer” but not “root”.
    #haiku	                              containing the hashtag “haiku”.
    from:interior	                        sent from Twitter account “interior”.
    list:NASA/astronauts-in-space-now	    sent from a Twitter account in the NASA list astronauts-in-space-now
    to:NASA	                              a Tweet authored in reply to Twitter account “NASA”.
    @NASA	                                mentioning Twitter account “NASA”.
    politics filter:safe	                containing “politics” with Tweets marked as potentially sensitive removed.
    puppy filter:media	                  containing “puppy” and an image or video.
    puppy filter:native_video	            containing “puppy” and an uploaded video, Amplify video, Periscope, or Vine.
    puppy filter:periscope	              containing “puppy” and a Periscope video URL.
    puppy filter:vine	                    containing “puppy” and a Vine.
    puppy filter:images	                  containing “puppy” and links identified as photos, including third parties such as Instagram.
    puppy filter:twimg	                  containing “puppy” and a pic.twitter.com link representing one or more photos.
    hilarious filter:links	              containing “hilarious” and linking to URL.
    puppy url:amazon	                    containing “puppy” and a URL with the word “amazon” anywhere within it.
    superhero since:2015-12-21	          containing “superhero” and sent since date “2015-12-21” (year-month-day).
    puppy until:2015-12-21	              containing “puppy” and sent before the date “2015-12-21”.
    movie -scary :)	                      containing “movie”, but not “scary”, and with a positive attitude.
    flight :(	                            containing “flight” and with a negative attitude.
    traffic ?	                            containing “traffic” and asking a question.

    Please, make sure to URL encode these queries before making the request. There are several online tools to help you to do that, or you can search at twitter.com/search and copy the encoded URL from the browser’s address bar. The table below shows some example mappings from search queries to URL encoded queries:

    Search query	URL encoded query
    #haiku #poetry	%23haiku+%23poetry
    “happy hour” :)	%22happy%20hour%22%20%3A%29
    Note that the space character can be represented by “%20” or “+” sign.

=end
  end

  def search_params
    {
      # geocode: '37.781157,-122.398720,1mi', # lat,long,radius(3mi)(5km)
      # lang: 'en',
      result_type: 'mixed', # 'mixed' (default), 'recent', 'popular'
      # count: 100, #number of tweets to return per page
      # until: 'yyyy-mm-dd',
      # since_id: 0, #integer,
      # max_id: 0, #integer
    }
  end
end
