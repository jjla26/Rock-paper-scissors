import React from 'react'
import { Link } from 'react-router-dom'
import { MDBContainer, MDBDataTable, MDBRow, MDBCol, MDBInput, MDBBtn, MDBJumbotron, MDBSelect } from 'mdbreact';
import Spinner from '../components/Spinner'
import ConfigurationForm from '../components/ConfigurationForm'
import Modal from '../components/Modal'
import { read, update, create } from '../services/api'

class Configuration extends React.Component{

    state={
        form:{
            move:"",
            kills:"",
        },
        moves: [],
        loading: true,
        open:false,
        openForm: false,
        error:false,
        message: "",
    }

    async componentDidMount(){
        const moves = await read('/moves')
        this.setState({ ...this.state, moves, loading: false })
    }

    handleClose = () =>{
        this.setState({ ...this.state, open: false, openForm: false})
    }

    handleActive = id => async e => {
        const { moves } = this.state
        const move = moves.filter(x => x.id === id)[0]
        try{
            const moveUpdated = await update('/moves', id, {...move, active: !move.active})
            this.setState({ ...this.state, moves: moves.map(x => {if(x.id === id){return moveUpdated}else{return x}}) })
        }
        catch{
            this.setState({ ...this.setState, open: true, message: "Updating error, contact the admin"})
        }
    } 

    handleFormModal = e => {
        console.log("modal")
      this.setState({ ...this.state, openForm: true})  
    }

    handleChange = field => e => {
        this.setState({
            ...this.state,
            form:{
                ...this.state.form,
                [field]: e.target.value
            }
        })
    }

    handleSubmitConfiguration = async e => {
        const { form, moves } = this.state
        e.preventDefault()
        if(form.move === "" || form.kills === ""){
            this.setState({ ...this.state, error: true, message: "all the fields are required!"})
        }else{
            try {
                const newMove = await create('/moves', form)
                this.setState({ ...this.state, openForm: false, open: true, message:"Move Created", moves: moves.concat([newMove])})
            } catch (error) {
                this.setState({ ...this.setState, openForm:false, open: true, message: "Creating error, contact the admin"})
            }
        }
    }

    render(){
        const { loading, moves, open, message, error, openForm } = this.state
        console.log(this.state) 
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
                            <MDBBtn onClick={this.handleFormModal}>Add Move</MDBBtn>
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
                                                    <MDBBtn onClick={this.handleActive(x.id)}>{x.active ? "Deactivate" : "Activate" }</MDBBtn>
                                                </div>
                                    }))
                                }}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBJumbotron>

                <Modal
                    handleClose={this.handleClose}
                    open={open}
                >
                    {message}
                </Modal>

                <Modal
                    handleClose={this.handleClose}
                    open={openForm}
                >
                    <ConfigurationForm error={error} message={message} handleSubmitConfiguration={this.handleSubmitConfiguration} handleChange={this.handleChange}/>

                </Modal>
            </MDBContainer>

        )
    }
}

export default Configuration