Rails.application.routes.draw do
  namespace :api do
    resources :moves
  end
  root 'welcome#index'
end
