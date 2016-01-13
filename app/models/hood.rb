class Hood < ActiveRecord::Base
  has_many :metros
  has_many :libraries
  has_many :grocers
end
