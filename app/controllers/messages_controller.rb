class MessagesController < ApplicationController
  def index
    
  end

  def create
    client = OpenAI::Client.new
    prompt = "Rewrite the following text in the style of the author #{message_params[:author]} : #{message_params[:sent_body]}"
    response = client.chat(
    parameters: {
        model: "gpt-3.5-turbo", 
        messages: [{ role: "user", content: prompt}], 
        temperature: 1,
    })
    response = response.dig("choices", 0, "message", "content") 
    params[:message][:received_body] = response
    message = Message.create!(message_params)
    
    if message
      render json: message
    else
      render json: message.errors
    end
  end

  private

  def message_params
    params.require(:message).permit(:author, :sent_body, :received_body)
  end
end
