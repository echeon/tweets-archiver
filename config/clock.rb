require 'clockwork'
require './config/boot'
require './config/environment'

module Clockwork
  handler do |job, time|
    puts "Running #{job}, at #{time}"
  end

  every(30.seconds, 'frequent.job') do
    puts "Hello"
  end
end
