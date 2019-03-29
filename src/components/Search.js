import React, { Component } from 'react';
import Suggestions from './Suggestions';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: '',
      results: this.props.usernameArr
    }
  }
  

  handleInputChange = () => {
    this.setState({
      query: this.search.value
    })
  }

  render() {

    console.log(this.props.usernameArr, 'usernameaeee');

    return (
      <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        <p>{this.state.query}</p>
        <Suggestions results={this.state.results} />
      </form>
    )
  }
}

export default Search;