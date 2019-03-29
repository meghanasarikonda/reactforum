import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

function User ({modal, toggle, comments, postbody}) {
  return(
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader >Post details</ModalHeader>
          <ModalBody>
          {postbody()}
          </ModalBody>
          <ModalBody>
            <h1>break</h1>
            {comments.map(comment => 
              <div key={comment.id}>
                <h4>{comment.name}</h4>
                <p>{comment.body}</p>
                <h4>{comment.email}</h4>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>Ok</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
  )
}

export default User;
