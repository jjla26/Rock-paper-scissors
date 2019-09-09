class Api::MovesController < ApplicationController
    skip_before_action :verify_authenticity_token

    def index
        moves = Move.all
        render json: moves
    end

    def update
        move = Move.find(params[:id])
        if move.update(move_params)
            render json: move
        else
            render json: { status: 401 }
        end
    end

    def create
        move = Move.new(move_params)
        if move.save
            render json: move
        else
            render json: { status: 401 }
        end
    end

    private

    def move_params
        params.permit(:move, :kills, :active)
    end

end