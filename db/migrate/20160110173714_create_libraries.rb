class CreateLibraries < ActiveRecord::Migration
  def change
    create_table :libraries do |t|
      t.json :geo
      t.timestamps null: false
    end
  end
end
