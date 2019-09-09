import React from 'react'
import { MDBContainer, MDBDataTable, MDBRow, MDBCol, MDBInput, MDBBtn, MDBJumbotron, MDBSelect } from 'mdbreact';


const Score = props => {
    const { round, player1, player2 } = props
    return(
        <MDBContainer>
            <MDBRow center middle>
                <MDBJumbotron>
                    <h2>Score</h2>
                    <MDBDataTable 
                        searching={false}
                        info={false}
                        striped
                        bordered
                        hover
                        data={{
                            columns: [
                                {
                                    label: 'Round',
                                    field: 'round',
                                    sort: 'asc',
                                    width: 150
                                },
                                {
                                    label: 'Winner',
                                    field: 'winner',
                                    sort: 'asc',
                                    width: 270
                                },
                                {
                                    label: 'Move of Player1',
                                    field: 'move1',
                                    sort: 'asc',
                                    width: 200
                                },
                                {
                                    label: 'Move of Player2',
                                    field: 'move2',
                                    sort: 'asc',
                                    width: 200
                                },
                            ],
                            rows: round.map(x => ({
                                round:x.number,
                                winner: x.winner === "draw" ? 'No Winner' : x.winner,
                                move1: x.move1,
                                move2: x.move2
                            })),
                        }}
                    />
                </MDBJumbotron>
            </MDBRow>
        </MDBContainer>
    )
}

export default Score