import React from 'react'
import { Link } from 'react-router-dom'
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBJumbotron } from 'mdbreact';
import Spinner from '../components/Spinner'

class Welcome extends React.Component{
    
    state={
        loading:true,
    } 

    componentDidMount(){
        this.setState({ ...this.state, loading: false })
    }

    render(){
        const { loading } = this.state
        return(
            loading ? <Spinner /> :
            <MDBContainer className="text-center my-5">
                <MDBJumbotron>
                    <h3>Welcome to: Rock, Paper, Scissors and something else! =)</h3>
                    <p>Click on "Configuration" if you want to customize the movements before starting!</p>
                        <MDBRow center middle>
                            <MDBCol md="12">
                                <Link to="/game">
                                    <MDBBtn>
                                        Play
                                    </MDBBtn>
                                </Link>
                                <Link to="/configuration">
                                    <MDBBtn>
                                        Configuration
                                    </MDBBtn>
                                </Link>
                            </MDBCol>
                        </MDBRow>
                </MDBJumbotron>
            </MDBContainer>
        )
    }
} 

export default Welcome
