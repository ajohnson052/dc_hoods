class Hood < ActiveRecord::Base
  has_many :bike_shares
  has_many :charter_schools
  has_many :childcare_facilities
  has_many :embassies
  has_many :grocers
  has_many :libraries
  has_many :metros
  has_many :nightclubs
  has_many :pharmacies
  has_many :place_of_worships
  has_many :police_stations
end
