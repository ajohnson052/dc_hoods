class GrocersController < ApplicationController

  def index
    hood = Hood.find(params[:hood_id])
    grocers = hood.grocers
    render json: grocers
  end

end
