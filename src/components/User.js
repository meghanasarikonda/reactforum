import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';

function User ({modal, toggle, userdata}) {
  return(
    <Modal isOpen={modal} toggle={toggle} autoFocus={true}>
      <ModalHeader >User details</ModalHeader>
      <ModalBody>
        <ListGroup>
          <ListGroupItem>username - {userdata.username}</ListGroupItem>
          <ListGroupItem>fullname - {userdata.name}</ListGroupItem>
          <ListGroupItem>email - {userdata.email}</ListGroupItem>
          <ListGroupItem>website - {userdata.website}</ListGroupItem>
          <ListGroupItem>companydetails - {userdata.companydetails}</ListGroupItem>
        </ListGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={toggle}>Ok</Button>{' '}
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

User.propTypes = {
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  userdata: PropTypes.object
}

export default User;
