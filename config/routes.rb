Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    get '/search_tweets' => 'tweets#search'
    get '/download_tweets' => 'tweets#download'
  end
end
