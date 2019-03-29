import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroupItem } from 'reactstrap';

function User ({modal, toggle, userdata}) {
  return(
    <Modal isOpen={modal} toggle={toggle} >
      <ModalHeader >User details</ModalHeader>
      <ModalBody>
        <ListGroupItem>username - {userdata.username}</ListGroupItem>
        fullname - {userdata.name}
        email - {userdata.email}
        website - {userdata.website}
        companydetails - {userdata.companydetails}
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Ok</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

export default User;
