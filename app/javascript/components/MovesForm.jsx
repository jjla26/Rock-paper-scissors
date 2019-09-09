import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBJumbotron, MDBSelect } from 'mdbreact';

class MovesForm extends React.Component{
    render(){
        const { round, player1, player2, handleSubmitMoves, moves, handleChange } = this.props
        const player = player1.turn ? player1 : player2
        console.log(moves)
        return(
            <MDBContainer>
                <MDBRow center middle>
                    <MDBJumbotron>
                        <MDBCol md="12">
                            <h4>Round: {round.length + 1}</h4>
                            <h6>{player.name}</h6>
                            <form onSubmit={handleSubmitMoves}>
                                <h6>Select Move</h6>
                                <select className="browser-default custom-select" onChange={handleChange(player.id,"move")}>
                                    <option>Select</option>
                                    {moves.map( x => 
                                    <option key={x.id} value={x.move}>{x.move}</option>
                                    )}
                                </select>

                                <MDBBtn type="submit">
                                    OK
                                </MDBBtn>
                            </form>
                        </MDBCol>
                    </MDBJumbotron>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default MovesForm