Rails.application.routes.draw do
  root 'pages#home'
  resources :messages, only: [:index, :create]

  get '/messages/latest', to: 'messages#show'
end
