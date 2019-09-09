import React from 'react'
import { Link } from 'react-router-dom'
import { MDBContainer, MDBDataTable, MDBRow, MDBCol, MDBInput, MDBBtn, MDBJumbotron, MDBSelect } from 'mdbreact';
import Spinner from '../components/Spinner'
import { read } from '../services/api'

class Configuration extends React.Component{

    state={
        moves: [],
        loading: true,
    }

    async componentDidMount(){
        const moves = await read('/moves')
        this.setState({ ...this.state, moves, loading: false })
    }

    render(){
        const { loading, moves } = this.state 
        return(
            loading ? <Spinner /> :
            <MDBContainer className="my-5 text-center">
                <MDBJumbotron>
                    <MDBRow center middle>
                        <MDBCol md="12">
                            <h2>Movimientos</h2>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center middle>
                        <MDBCol md="12">
                            <MDBBtn>Add Move</MDBBtn>
                            <Link to="/">
                                <MDBBtn>Back to Home</MDBBtn>
                            </Link>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow center middle>
                        <MDBCol md="12">
                            <MDBDataTable 
                                searching={false}
                                info={false}
                                striped
                                bordered
                                hover
                                data={{
                                    columns: [
                                        {
                                            label: 'Move',
                                            field: 'move',
                                            sort: 'asc',
                                            width: 150
                                        },
                                        {
                                            label: 'Kills',
                                            field: 'kills',
                                            sort: 'asc',
                                            width: 270
                                        },
                                        {
                                            label: 'Active',
                                            field: 'active',
                                            sort: 'asc',
                                            width: 270
                                        },
                                        {
                                            label: 'Edit',
                                            field: 'edit',
                                            sort: 'asc',
                                            width: 270
                                        },
                                    ],
                                    rows: moves.map(x => ({
                                        move: x.move,
                                        kills: x.kills,
                                        active: x.active ? "YES" : "NO",
                                        action: <div>
                                                    <MDBBtn>Edit</MDBBtn>
                                                    <MDBBtn>Delete</MDBBtn>
                                                </div>
                                    }))
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBJumbotron>
            </MDBContainer>

        )
    }
}

export default Configuration