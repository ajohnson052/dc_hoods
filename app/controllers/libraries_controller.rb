class LibrariesController < ApplicationController

  def index
    hood = Hood.find(params[:hood_id])
    libraries = hood.libraries
    render json: libraries
  end

end
