class MessagesController < ApplicationController
  def index
    
  end

  def show
    message = Message.last
    render json: message
  end

  def create
    response = Message.chat_gpt_rewrite(params, message_params) 
    params[:message][:received_body] = response
    message = Message.create!(message_params)  
  end

  private

  def message_params
    params.require(:message).permit(:author, :sent_body, :received_body)
  end
end
