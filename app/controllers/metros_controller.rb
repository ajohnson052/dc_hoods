class MetrosController < ApplicationController

  def index
    hood = Hood.find(params[:hood_id])
    metros = hood.metros
    render json: metros
  end

end
