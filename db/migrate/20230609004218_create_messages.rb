class CreateMessages < ActiveRecord::Migration[7.0]
  def change
    create_table :messages do |t|
      t.string :author
      t.text :sent_body
      t.text :received_body

      t.timestamps
    end
  end
end
