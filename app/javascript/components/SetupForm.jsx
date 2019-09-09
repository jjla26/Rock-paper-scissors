import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBJumbotron } from 'mdbreact';

class SetupForm extends React.Component{
    render(){
        const { handleSubmitPlayers, error, message, handleChange } = this.props
        return(
            <MDBContainer>
                <MDBRow center middle>
                    <MDBJumbotron>
                        <MDBCol md="12">
                            <form onSubmit={handleSubmitPlayers}>
                                <div className="grey-text">
                                    <h4>Enter Player's Names</h4>
                                    <MDBInput icon="user" group type="text" label="Player 1" onChange={handleChange(1,"name")} />
                                    <MDBInput icon="user" group type="text" label="Player 2" onChange={handleChange(2,"name")} />
                                    <h4>Rounds</h4>
                                    <MDBInput group type="number" label="Rounds" onChange={handleChange(null,"roundMax")} />
                                    <MDBBtn type="submit">
                                        Start
                                    </MDBBtn>
                                    {error && <p style={{ color: 'red' }}>{message}</p>}
                                </div>
                            </form>
                        </MDBCol>
                    </MDBJumbotron>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default SetupForm