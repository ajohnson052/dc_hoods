class CreatePlaceOfWorships < ActiveRecord::Migration
  def change
    create_table :place_of_worships do |t|
      t.string :name
      t.string :address
      t.references :hood, index: true, foreign_key: true
      t.timestamps null: false
      t.float :coordinates, array: true, default: []
    end
  end
end
