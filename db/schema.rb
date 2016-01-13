# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160113042849) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "grocers", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.integer  "hood_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.float    "coordinates", default: [],              array: true
  end

  add_index "grocers", ["hood_id"], name: "index_grocers_on_hood_id", using: :btree

  create_table "hoods", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.float    "coordinates", default: [],              array: true
  end

  create_table "libraries", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.integer  "hood_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.float    "coordinates", default: [],              array: true
  end

  add_index "libraries", ["hood_id"], name: "index_libraries_on_hood_id", using: :btree

  create_table "metros", force: :cascade do |t|
    t.string   "name"
    t.string   "address"
    t.integer  "hood_id"
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.float    "coordinates", default: [],              array: true
  end

  add_index "metros", ["hood_id"], name: "index_metros_on_hood_id", using: :btree

  add_foreign_key "grocers", "hoods"
  add_foreign_key "libraries", "hoods"
  add_foreign_key "metros", "hoods"
end
