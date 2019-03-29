import React, { Component } from 'react';
import './App.css';
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';
import Search from './Search';
import User from './User';
import Post from './Post';

class App extends Component {

  constructor() {
    super();
    this.state = {
      postdata: [],
      userArr: [],
      userdata: {username: 'meghana'},
      comments: [],
      modal: false,
      postmodal: false,
      currentPost: '',
      currentUserName: ''
    }

    this.toggle = this.toggle.bind(this);
    this.togglepost = this.togglepost.bind(this);
    this.postbody = this.postbody.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      postmodal: false,
      modal: !prevState.modal
    }));
  }

  togglepost() {
    this.setState(prevState => ({
      postmodal: !prevState.postmodal
    }));
  }

  getUser(id) {
    const fetchUser = async () => {
      try {
        let user = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        if(!this.state.userArr[id]) {
          let userarr = this.state.userArr;
          userarr[id] = user.data.username
          console.log(this.state.userArr, 'userArr')
          this.setState({userArr: userarr})
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchUser(id);
  }

  handleUsernameClick(e) {
    alert('username first')
    e.stopPropagation();
    console.log(e.target.dataset.id, 'id', this.state.userArr)
    let uniqueUser = async () => {
      let userdata = await axios.get(`https://jsonplaceholder.typicode.com/users/${e.target.dataset.id}`);
      this.setState({
        userdata: userdata.data
      })
      return console.log(userdata.data, 'data')
    }
    uniqueUser();
    e.preventDefault();
    this.setState({
      modal: true
    })
    console.log(e.target.dataset.id, 'id')
    // async function user() {
    //   await axios.get(`https://jsonplaceholder.typicode.com/users/${e.target.dataset.id}`)
    // }
  }

  postbody() {
    return (
      <div>
        <h4>Title - {this.state.currentPost.title}</h4>
        <h4>Username - {this.state.currentUserName}</h4>
      </div>
    )
  }

  handlePostClick(e) {
    alert('post first')
    e.preventDefault();
    console.log('postClick', e.currentTarget.dataset.userid);
    this.setState({
      currentPost : this.state.postdata[e.currentTarget.dataset.post - 1],
      currentUserName : this.state.userArr[e.currentTarget.dataset.userid]
    })
    
    let uniquePost = async () => {
      let comments = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${e.currentTarget.dataset.post}`);
      this.setState({
        comments: comments.data
      })
      return console.log(comments.data, 'data')
    }
    uniquePost();

    // let userData = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${e.target.dataset.post}`);
    console.log(e.currentTarget.dataset.userid, e.currentTarget.dataset.post)
    if (!this.state.modal) {
      this.setState({
        postmodal: true
      })
    }
  }

  componentDidMount() {
    const fetchData = async () => {
      let posts = await axios.get("https://jsonplaceholder.typicode.com/posts/");
      posts.data.map(post => {
        return this.getUser(post.userId)
      });
      this.setState({postdata: posts.data});
    };
    fetchData();
  }

  render() {
    return (
      <div className="App">
        <Search usernameArr={this.state.userArr}/>
        <h1>Hello</h1>
        <ListGroup>
        {this.state.postdata.map(post => 
          <ListGroupItem data-post={post.id} data-userid={post.userId} key={post.id} className="displayposts" onClick={this.handlePostClick.bind(this)}>
            <h4>{post.title}</h4>
            <a href="#" data-id={post.userId} onClick={this.handleUsernameClick.bind(this)}>{this.state.userArr[post.userId]}</a>
          </ListGroupItem>
        )}
        </ListGroup>
        {/* <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
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
        </Modal> */}

        <User modal={this.state.modal} toggle={this.toggle} userdata={this.state.userdata} />

        <Post modal={this.state.postmodal} toggle={this.togglepost} postdata={this.state.postdata} comments={this.state.comments} postbody={this.postbody}/>

        {/* <Modal isOpen={this.state.postmodal && !this.state.modal} toggle={this.togglepost}>
        <ModalHeader >Post details</ModalHeader>
          <ModalBody>
          {this.postbody()}
          </ModalBody>
          <ModalBody>
            <h1>break</h1>
            {this.state.comments.map(comment => 
              <div key={comment.id}>
                <h4>{comment.name}</h4>
                <p>{comment.body}</p>
                <h4>{comment.email}</h4>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.togglepost}>Ok</Button>{' '}
            <Button color="secondary" onClick={this.togglepost}>Cancel</Button>
          </ModalFooter>
        </Modal> */}
      
      </div>
    );
  }
}

export default App;