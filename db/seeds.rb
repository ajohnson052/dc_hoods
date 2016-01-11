require 'pry'
require 'geokit'

#destroy everything in existing db
Metro.destroy_all
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
def create_metros geokit_hoods
  response = HTTParty.get("https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/metro-stations-district.geojson")
  parsed = JSON.parse(response)
  collection = parsed["features"]
  collection.each do |station|
    coordinates = station["geometry"]["coordinates"].reverse
    point = Geokit::LatLng.new(coordinates[0], coordinates[1])
    geokit_hoods.each do |hood|
      if hood[1].contains?(point)
        hood[0].metros.create(coordinates: coordinates, name: station["properties"]["NAME"], address: station["properties"]["ADDRESS"])
        break
      end
    end
  end
end

geokit_hoods = []
create_hoods(geokit_hoods)
create_metros(geokit_hoods)
