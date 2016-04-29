class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :description
      t.text :content
      t.string :keywords
      t.boolean :noindex, :default => false
      t.boolean :nofollow, :default => false

      t.timestamps null: false
    end
  end
end
