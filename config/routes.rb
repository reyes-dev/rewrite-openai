Rails.application.routes.draw do
  root 'pages#home'
  resources :messages, only: [:index, :create] 
end
