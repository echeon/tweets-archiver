Rails.application.routes.draw do
  root to: 'static_pages#root'
  #
  # namespace :api, defaults: {format: :json} do
  #   resources :users, only: [:create, :show]
  #   resources :events, only: [:index, :create, :destroy, :update, :show]
  #   resources :bookmarks, only: [:index, :create, :destroy]
  #   resources :tickets, only: [:index, :create, :destroy]
  #   resources :types, only: :index
  #   resources :categories, only: :index
  #
  #   resource :session, only: [:create, :destroy]
  # end
end
