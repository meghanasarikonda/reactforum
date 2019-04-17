import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem } from 'reactstrap';
import PropTypes from 'prop-types';
import './Post.css';

function Post ({modal, toggle, comments, postbody}) {
  return(
    <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader >Post details</ModalHeader>
          <ModalBody>
            {
              <div>
                <b>{postbody.title}</b>
                <p>by <b>{postbody.username}</b></p>
              </div>
            }
            <p>Comments</p>
            {comments.map(comment => 
              <ListGroup key={comment.id}>
                <ListGroupItem className="name">{comment.name}</ListGroupItem>
                <ListGroupItem>{comment.body}</ListGroupItem>
                <ListGroupItem>{comment.email}</ListGroupItem>
              </ListGroup>
            )}
          </ModalBody>
          <ModalFooter aria-label="postFooter">
            <Button aria-labelledby="postFooter ok" color="primary" onClick={toggle}>Ok</Button>{' '}
            <Button aria-labelledby="postFooter cancel" color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
  )
}

Post.propTypes = {
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  comments: PropTypes.array,
  postbody: PropTypes.object.isRequired
}



export default Post;
