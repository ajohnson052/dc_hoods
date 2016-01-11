class CreateMetros < ActiveRecord::Migration
  def change
    create_table :metros do |t|
      t.json :geo
      t.references :hood, index: true, foreign_key: true
      t.timestamps null: false
    end
  end
end
