import React from 'react';
import { Modal } from 'react-bootstrap';

function User ({props}) {
  return(
    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
      <ModalHeader >User details</ModalHeader>
      <ModalBody>
        username - {this.state.userdata.username}
        fullname - {this.state.userdata.name}
        email - {this.state.userdata.email}
        website - {this.state.userdata.website}
        companydetails - {this.state.userdata.companydetails}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={this.toggle}>Ok</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default User;
