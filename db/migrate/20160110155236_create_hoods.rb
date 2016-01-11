class CreateHoods < ActiveRecord::Migration
  def change
    create_table :hoods do |t|
      t.string :coordinates, array: true, default: []
      t.string :name
      t.timestamps null: false
    end
  end
end
