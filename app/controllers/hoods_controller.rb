class HoodsController < ApplicationController

  def index
    hoods = Hood.all
    render json: hoods
  end

  def show
    hood = Hood.find(params[:id])
    render json: hood
  end

end