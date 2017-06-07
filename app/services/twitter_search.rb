module TwitterSearch
  class Client
    include ActionController::Live

    def initialize
      @connection = base_connection
      @consumer_key = ENV['CONSUMER_KEY']
      @consumer_secret = ENV['CONSUMER_SECRET']
    end

    def search(search_params)
      return nil unless search_params[:q]

      @bearer_token ||= bearer_token
      search = @connection.get do |req|
        req.url '/1.1/search/tweets.json'
        req.headers['Authorization'] = "Bearer #{@bearer_token}"
        req.params = search_params
      end

      JSON.parse(search.body)
    end

    def base_connection
      Faraday.new url: "https://api.twitter.com" do |faraday|
        faraday.request :url_encoded
        faraday.response :logger
        faraday.adapter Faraday.default_adapter
      end
    end

    def bearer_token
      cred = "#{@consumer_key}:#{@consumer_secret}"
      res = @connection.post do |req|
        req.url '/oauth2/token'
        req.headers['Authorization'] = "Basic #{Base64.urlsafe_encode64(cred)}"
        req.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
        req.body = "grant_type=client_credentials"
      end
      res_json = JSON.parse(res.body)

      raise "Wrong token type: #{res_json['token_type']}" unless res_json["token_type"] == 'bearer'
      res_json["access_token"]
    end
  end
end
