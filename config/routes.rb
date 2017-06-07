Rails.application.routes.draw do
  root to: 'static_pages#root'

  namespace :api, defaults: {format: :json} do
    get '/search_tweets' => 'tweets#search'
  end

  namespace :api, defaults: {format: :xlsx} do
    get '/download_tweets' => 'tweets#download'
  end
end
