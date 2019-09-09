import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {

render() {
    const { open, handleClose } = this.props
  return (
      <MDBContainer>
        <MDBModal isOpen={open} toggle={handleClose} centered>
          <MDBModalHeader toggle={handleClose}>Notification</MDBModalHeader>
          <MDBModalBody>
            {this.props.children}
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={handleClose}>Close</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

export default ModalPage;