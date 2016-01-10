class CreateHoods < ActiveRecord::Migration
  def change
    create_table :hoods do |t|
      t.json :geo
      t.timestamps null: false 
    end
  end
end
