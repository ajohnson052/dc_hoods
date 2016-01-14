class HoodsController < ApplicationController

  def index
    hoods = Hood.all
    render json: hoods
  end

  def show
    hood = Hood.find(params[:id])
    render json: hood.to_json(include: [
      :bike_shares,
      :charter_schools,
      :childcare_facilities,
      :embassies,
      :grocers,
      :libraries,
      :metros,
      :nightclubs,
      :pharmacies,
      :place_of_worships,
      :police_stations
      ])
  end

end
