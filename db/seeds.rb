require 'pry'
require 'geokit'

#destroy everything in existing db
BikeShare.destroy_all
CharterSchool.destroy_all
ChildcareFacility.destroy_all
Embassy.destroy_all
Grocer.destroy_all
Library.destroy_all
Metro.destroy_all
Nightclub.destroy_all
Pharmacy.destroy_all
PlaceOfWorship.destroy_all
PoliceStation.destroy_all
Hood.destroy_all


#create neighborhoods
def create_hoods array
  response = HTTParty.get("https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/neighborhood-names.geojson")
  parsed = JSON.parse(response)
  hoods = parsed["features"]
  hoods.each do |hood|
    perimeter = []
    hood["geometry"]["coordinates"][0].each do |coordinates|
      point = Geokit::LatLng.new(coordinates[1], coordinates[0])
      perimeter.push(point)
    end
    geokit_hood = Geokit::Polygon.new(perimeter)
    # ar_hood = Hood.create(geo: hood)
    ar_hood = Hood.create(coordinates: hood["geometry"]["coordinates"][0], name: hood["properties"]["NAME"])
    array.push([ar_hood, geokit_hood])

  end
end

#create metros
def create_assets(subject, model, name, geokit_hoods)
  response = HTTParty.get("https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/#{subject}.geojson")
  parsed = JSON.parse(response)
  collection = parsed["features"]
  collection.each do |station|
    coordinates = station["geometry"]["coordinates"].reverse
    point = Geokit::LatLng.new(coordinates[0], coordinates[1])
    geokit_hoods.each do |hood|
      if hood[1].contains?(point)
        model_name = model.constantize
        model_name.create(coordinates: coordinates, name: station["properties"][name], address: station["properties"]["ADDRESS"], hood: hood[0])
        break
      end
    end
  end
end

geokit_hoods = []
create_hoods(geokit_hoods)
create_assets("metro-stations-district", "Metro", "NAME", geokit_hoods)
create_assets("libraries", "Library", "NAME", geokit_hoods)
create_assets("grocery-store-locations", "Grocer", "STORENAME", geokit_hoods)
create_assets("capital-bike-share-locations", "BikeShare", "TERMINAL_NUMBER", geokit_hoods)
create_assets("places-of-worship", "PlaceOfWorship", "NAME", geokit_hoods)
create_assets("police-stations", "PoliceStation", "NAME", geokit_hoods)
create_assets("charter-schools", "CharterSchool", "NAME", geokit_hoods)
create_assets("child-care-locations", "ChildcareFacility", "NAME", geokit_hoods)
create_assets("embassies", "Embassy", "EMB_TITLE", geokit_hoods)
create_assets("night-club", "Nightclub", "Name", geokit_hoods)
create_assets("pharmacy-locations", "Pharmacy", "NAME", geokit_hoods)
