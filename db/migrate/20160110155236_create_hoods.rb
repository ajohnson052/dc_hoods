class CreateHoods < ActiveRecord::Migration
  def change
    create_table :hoods do |t|
      t.string :name
      t.timestamps null: false
      t.string :coordinates, array: true, default: []
    end
  end
end
