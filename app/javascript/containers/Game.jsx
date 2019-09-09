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
        this.setState({ ...this.state, loading:false})
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

    render(){
        const { loading } = this.state
        return(
            loading ? <Spinner /> :
            <MDBContainer className="my-5">
                <MDBRow>
                    <MDBCol md="12">
                        <SetupForm handleSubmitPlayers={this.handleSubmitPlayers} handleChange={this.handleChange} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Game