import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import SetupForm from '../components/SetupForm'
import MovesForm from '../components/MovesForm'
import Score from '../components/Score'
import Winner from '../components/Winner'
import Spinner from '../components/Spinner'
import { read } from '../services/api'

class Game extends React.Component{

    constructor(props){
        super(props)
        this.state={
            player1:{
                id: 1,
                name: "",
                turn: false,
                move: "",
                wins: 0
            },
            player2:{
                id: 2,
                name: "",
                turn: false,
                move: "",
                wins: 0
            },
            moves: [],
            start: false,
            round: [],
            roundMax: 3,
            errors:[],
            loading: true,
        }
    }

    async componentDidMount(){
        const moves = await read('/moves')
        this.setState({ ...this.state, moves, loading:false})
    }

    handleChange = (player,field) => e => {
        player ? 
            player === 1 ? 
                this.setState({ ...this.state, player1:{
                    ...this.state.player1,
                    [field]: e.target.value
                }}) 
            :
                this.setState({ ...this.state, player2:{
                    ...this.state.player2,
                    [field]: e.target.value
                }})
        :

        this.setState({ 
            ...this.state, 
            [field]: isNaN(e.target.value) ? e.target.value : parseInt(e.target.value) })
    }

    handleSubmitPlayers = e => {
        e.preventDefault()
        this.setState({ 
            ...this.state, 
            player1:{ ...this.state.player1, turn: true },
            start: true,
        })
    }

    handleSubmitMoves = e => {
        const { moves, player1 } = this.state
        e.preventDefault()
        e.target.reset()
        if(player1.turn){
            this.setState({ ...this.state, player1:{ ...this.state.player1, turn:false }, player2:{ ...this.state.player2, turn:true }})
        }else{
            if(moves.some(x => (x.move === this.state.player1.move && x.kills === this.state.player2.move ))){
                this.setState({ 
                    ...this.state, 
                    player1: {
                        ...this.state.player1,
                        wins: this.state.player1.wins + 1,
                        turn: true,
                    },
                    player2:{
                        ...this.state.player2,
                        turn: false,
                    },
                    round: this.state.round.concat(
                        [
                            {
                                number: this.state.round.length === 0 ? 1 : this.state.round.length + 1,
                                winner: this.state.player1.name,
                                move1: this.state.player1.move,
                                move2: this.state.player2.move
                            }
                        ]
                    )
                })
            }else if(moves.some(x => (x.move === this.state.player2.move && x.kills === this.state.player1.move ))){
                this.setState({ 
                    ...this.state, 
                    player1: {
                        ...this.state.player1,
                        turn: true,
                    },
                    player2:{
                        ...this.state.player2,
                        wins: this.state.player2.wins + 1,
                        turn: false,
                    },
                    round: this.state.round.concat(
                        [
                            {
                                number: this.state.round.length === 0 ? 1 : this.state.round.length + 1,
                                winner: this.state.player2.name,
                                move1: this.state.player1.move,
                                move2: this.state.player2.move
                            }
                        ]
                    )
                })
            }else{
                this.setState({ 
                    ...this.state, 
                    player1: {
                        ...this.state.player1,
                        turn: true,
                    },
                    player2:{
                        ...this.state.player2,
                        turn: false,
                    },
                    round: this.state.round.concat(
                        [
                            {
                                number: this.state.round.length === 0 ? 1 : this.state.round.length + 1,
                                winner: "draw",
                                move1: this.state.player1.move,
                                move2: this.state.player2.move
                            }
                        ]
                    )
                })
            }
        }
    }

    render(){
        const { loading, moves, player1, player2, round, roundMax, start } = this.state
        return(
            loading ? <Spinner /> :
            <MDBContainer className="my-5">
                <MDBRow>
                    <MDBCol md="12">
                        {round.length === 0 && !start &&
                        <SetupForm handleSubmitPlayers={this.handleSubmitPlayers} handleChange={this.handleChange} />
                        }
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    {round.length >= 0 && start && round.length < roundMax  &&
                    <MDBCol md="6">
                        <MovesForm moves={moves} player1={player1} player2={player2} round={round} handleSubmitMoves={this.handleSubmitMoves} handleChange={this.handleChange} />    
                    </MDBCol>
                    }
                    { round.length > 0 && round.length <= roundMax &&
                    <MDBCol md="6">
                        <Score player1={player1} player2={player2} round={round} roundMax={roundMax}/>
                    </MDBCol>
                    }
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Game