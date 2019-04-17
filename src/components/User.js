import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';

function User ({ modal, toggle, userdata }) {
  
  const {username, name, email, website, company} = userdata

  return(
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader >User details</ModalHeader>
      <ModalBody>
        <ListGroup>
          <ListGroupItem>username - {username}</ListGroupItem>
          <ListGroupItem>fullname - {name}</ListGroupItem>
          <ListGroupItem>email - {email}</ListGroupItem>
          <ListGroupItem>website - {website}</ListGroupItem>
          <ListGroupItem>companyname - {company ? company.name: ''}</ListGroupItem>
        </ListGroup>
      </ModalBody>
      <ModalFooter aria-label="userFooter">
        <Button aria-labelledby="userFooter ok" color="primary" onClick={toggle} tabIndex={1}>Ok</Button>
        <Button aria-labelledby="userFooter cancel" color="secondary" onClick={toggle} tabIndex={1}>Cancel</Button>
      </ModalFooter>
    </Modal>
  )
}

User.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  userdata: PropTypes.object.isRequired
}

export default User;
