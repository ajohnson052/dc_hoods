require 'pry'
#destroy everything in existing db
Hood.destroy_all
Library.destroy_all

#function for converting traditional geojson to [lat, lng] for use with mapbox
def flip_lat_lng array
  array.each do |element|
    element.reverse!
  end
end

#create neighborhoods
def create_hoods
  response = HTTParty.get("https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/neighborhood-names.geojson")
  parsed = JSON.parse(response)
  hoods = parsed["features"]
  hoods.each do |hood|
    flip_lat_lng hood["geometry"]["coordinates"][0]
    Hood.create(geo: hood)
  end
end

#create libraries
def create_libraries
  response = HTTParty.get("https://raw.githubusercontent.com/benbalter/dc-maps/master/maps/metro-stations-district.geojson")
  parsed = JSON.parse(response)
  collection = parsed["features"]
  collection.each do |library|
    library["geometry"]["coordinates"].reverse!
    Library.create(geo: library)
  end
end

# def create(url, class)
#   response = HTTParty.get(url)
#   parsed = JSON.parse(response)
#   collection = parsed["features"]
#   collection.each do |member|
#     member["geometry"]["coordinates"].reverse!
#     class.create(geo: member)
#   end
# end

create_hoods
create_libraries
