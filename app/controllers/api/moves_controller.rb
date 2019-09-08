class Api::MovesController < ApplicationController
    def index
        moves = Move.all
        render json: moves
    end
end