class RenameColumn < ActiveRecord::Migration
  def change
    rename_column :metros, :geo, :coordinates
  end
end
