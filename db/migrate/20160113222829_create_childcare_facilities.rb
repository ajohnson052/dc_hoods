class CreateChildcareFacilities < ActiveRecord::Migration
  def change
    create_table :childcare_facilities do |t|
      t.string :name
      t.string :address
      t.references :hood, index: true, foreign_key: true
      t.timestamps null: false
      t.float :coordinates, array: true, default: []
    end
  end
end
