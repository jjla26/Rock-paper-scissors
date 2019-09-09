import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBJumbotron, MDBSelect } from 'mdbreact';


const Winner = props => {
    const { player, handleRestart } = props
    return(
        <MDBContainer>
            <MDBRow center middle>
                <MDBJumbotron>
                    <MDBCol md="12">
                        <h1>{player.name ? 'We have a Winner' : ""}</h1>
                        <h2>{player.name ? player.name + 'is the new EMPEROR' : 'this was a DRAW, TRY again' } </h2>
                        <button onClick={handleRestart}>Play again</button>
                    </MDBCol>
                </MDBJumbotron>
            </MDBRow>
        </MDBContainer>
    )
}

export default Winner