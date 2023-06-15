class Message < ApplicationRecord
  def self.chat_gpt_rewrite(params, message_params)
    client = OpenAI::Client.new
    prompt = "Rewrite the following text in the style of the author #{message_params[:author]} : #{message_params[:sent_body]}"
    response = client.chat(
    parameters: {
        model: "gpt-3.5-turbo", 
        messages: [{ role: "user", content: prompt}], 
        temperature: 1,
    })
    response = response.dig("choices", 0, "message", "content")
    return response
  end
end
