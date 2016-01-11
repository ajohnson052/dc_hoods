class CreateMetros < ActiveRecord::Migration
  def change
    create_table :metros do |t|
      t.string :coordinates, array: true, default: []
      t.string :name
      t.string :address
      t.references :hood, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
