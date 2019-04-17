import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import axios from "axios";
import { ListGroup, ListGroupItem } from 'reactstrap';
import Search from './Search';

const User = React.lazy(() => import("./User"));
const Post = React.lazy(() => import("./Post"));

class App extends Component {

  constructor() {
    super();

    this.state = {
      posts: [],
      usernameArr: ['first'],
      userdata: [],
      currentUserData: {},
      comments: [],
      modal: false,
      postmodal: false,
      currentUserName: '',
      currentPost: '',
    }

    this.toggle = this.toggle.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.handleUsernameClick = this.handleUsernameClick.bind(this)
  }

  toggle(status) {
    return () => (
      this.setState(prevState => ({
        [`${status}`]: !prevState[`${status}`]
      }))
    );
  }

  async getUser(id) {

    try {
      let user = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
      if(!this.state.usernameArr[id]) {
        let usernameArr = this.state.usernameArr;
        usernameArr[id] = await user.data.username
        let userdata = this.state.userdata
        userdata[id] = await user.data

        this.setState({
          usernameArr,
          userdata: await userdata
        })

      }
    }
    catch (error) {
      console.log(error);
    }

  }

  async handleUsernameClick(e) {

    e.preventDefault();
    e.stopPropagation();
    const {target: {dataset: {id}}} = e
    
    this.setState({
      modal: true,
      currentUserData: await this.state.userdata[id]
    })
 
  }

  async handlePostClick({currentTarget: {dataset: {userid, postid}}}) {

    let currentPost = this.state.posts[postid - 1]['title'];
    let currentUserName = this.state.usernameArr[userid];
    
    if (this.state.currentPost !== currentPost) {
      
        let comments = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`);
        
        this.setState({
          currentPost,
          currentUserName,
          comments: await comments.data,
          postmodal: true
        })
    }
      
  }

  async componentDidMount() {
    this.axiosCancelSource = axios.CancelToken.source()
    let posts = await axios.get("https://jsonplaceholder.typicode.com/posts/");
    
    await posts.data.map(post => {
      return this.getUser(post.userId)
    });
    this.setState(
      {posts: await posts.data}
    );
  }

  componentWillUnmount() {
    this.axiosCancelSource.cancel('Component unmounted.')
  }

  render() {
    return (
      <div className="container">
        <div className="search">
          <Search 
            usernameArr={this.state.usernameArr} 
            toggleUser={this.toggle('modal')}  
            handleUsernameClick={this.handleUsernameClick}
          />
        </div>
        <h2>Posts</h2>
        <ListGroup>
        {this.state.posts.map(post => 
          <ListGroupItem 
            tabIndex="0"
            role="button"
            aria-label={`click post`}
            data-postid={post.id} 
            data-userid={post.userId} 
            key={post.id} 
            className="displayposts" 
            onClick={this.handlePostClick}
            onKeyDown={
              async (e) => (e.keyCode === 13) ? await this.handlePostClick(e):""
            }
          >
            <article>{post.title}</article>
            <a 
              className="username"
              href="0"
              tabIndex="0"
              role="button"
              aria-label={ `click username`}
              data-id={post.userId} 
              onClick={this.handleUsernameClick}
              onKeyDown={
                async (e) => (e.keyCode === 13) ? await this.handleUsernameClick(e):""
              }
            >
              {this.state.usernameArr[post.userId]}
            </a>
          </ListGroupItem>
        )}
        </ListGroup>
        <Suspense fallback={<div>Loading...</div>}>

          <User 
            modal={this.state.modal} 
            toggle={this.toggle('modal')} 
            userdata={this.state.currentUserData} 
          />
          <Post 
            modal={this.state.postmodal} 
            toggle={this.toggle('postmodal')} 
            comments={this.state.comments} 
            postbody={{ title: this.state.currentPost, username: this.state.currentUserName}}
          />

        </Suspense>
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array,
  usernameArr: PropTypes.array,
  userdata: PropTypes.object,
  currentPost: PropTypes.string,
  currentUserName: PropTypes.string,
  modal: PropTypes.bool,
  postmodal: PropTypes.bool,
  toggle: PropTypes.func,
  comments: PropTypes.array,
  postbody: PropTypes.object
}

export default App;