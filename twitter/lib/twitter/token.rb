require 'memoizable'
require 'twitter/base'

module Twitter
  class Token < Twitter::Base
    include Memoizable

    # @return [String]
    attr_reader :access_token, :token_type
    alias to_s access_token

    BEARER_TYPE = 'bearer'.freeze

    # @return [Boolean]
    def bearer?
      @attrs[:token_type] == BEARER_TYPE
    end
    memoize :bearer?
  end
end
