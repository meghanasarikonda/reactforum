import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import Suggestions from './Suggestions';
import PropTypes from 'prop-types';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: [],
      modal: false
    }

    this.toggle = this.toggle.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }))
  }

  async handleSuggestionClick(e) {
    
    e.preventDefault();
    e.stopPropagation();
    this.props.handleUsernameClick(e);
    this.toggle();
    
  }

  getInfo() {
    
    let query = this.state.query;
    let results = [];

    for (var id = 1; id < this.props.usernameArr.length; id++) {
      let username = this.props.usernameArr[id];
        results.push({username, id});
    }

    let result = results.filter(({username}) => {
      if((username.slice(0, query.length)).toLowerCase() === query.toLowerCase()) {
        return username
      } 
      return false
    })
    
    this.setState({
      results: result
    })
  }
  

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.getInfo()
        }
      } 
    })
  }

  render() {
    return (
      <div>
        <Button 
          aria-label={'search for username'}
          onClick={this.toggle}
        >
          Search by Username
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            <input 
              placeholder="Select or Search for..."
              ref={input => this.search = input}
              onChange={this.handleInputChange}
            />
            
            <Suggestions results={this.state.results} click={this.handleSuggestionClick} />
            
          </ModalBody>
          <ModalFooter>
            <Button aria-label="cancelSearchModal" color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        
        </Modal>
      </div>
      
    )
  }
}

Search.propTypes = {
  usernameArr: PropTypes.array.isRequired,
  toggleUser: PropTypes.func.isRequired,
  handleUsernameClick: PropTypes.func.isRequired 
}


export default Search;