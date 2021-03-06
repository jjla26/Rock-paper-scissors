import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBJumbotron } from 'mdbreact';

class ConfigurationForm extends React.Component{
    render(){
        const { handleSubmitConfiguration, handleUpdate, edit, form, handleChange, error, message } = this.props
        return(
            <MDBContainer>
                <MDBRow center middle>
                    <MDBCol md="12">
                    <form onSubmit={edit ? handleUpdate : handleSubmitConfiguration}>
                        <div className="grey-text">
                            <MDBInput type="text" value={form.move} label="Move Name:" onChange={handleChange("move")} />
                            <MDBInput type="text" value={form.kills} label="This Move Kills:" onChange={handleChange("kills")} />
                            <MDBBtn type="submit">
                                Send Form
                            </MDBBtn>
                            {error && <p style={{ color: 'red' }}>{message}</p>}
                        </div>
                    </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default ConfigurationForm