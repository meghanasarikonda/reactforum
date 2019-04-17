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
      searchmodal: false,
      currentUserName: '',
      currentPost: '',
    }

    this.toggle = this.toggle.bind(this);
    this.handlePostClick = this.handlePostClick.bind(this);
    this.handleUsernameClick = this.handleUsernameClick.bind(this)
    this.handleSearchUsernameClick = this.handleSearchUsernameClick.bind(this)
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
        // console.log(this.state.usernameArr, 'usernameArr')
        this.setState({
          usernameArr,
          userdata
        })
      }
    }
    catch (error) {
      console.log(error);
    }

  }
  

  handleSearchUsernameClick(e) {
    console.log('comee')
    return this.handleUsernameClick(e);
  }

  handleUsernameClick(e) {

    e.preventDefault();
    e.stopPropagation();
    const {target: {dataset: {id}}} = e
    
    this.setState({
      modal: true,
      currentUserData: this.state.userdata[id]
    })
 
  }

  async handlePostClick({currentTarget: {dataset: {userid, postid}}}) {
    
    // console.log('postClick', e.currentTarget.dataset.userid);
    // this.setState({
      
    // })

    let currentPost = this.state.posts[postid - 1]['title'];
    // console.log(this.state.usernameArr, 'usernameaeee', e.currentTarget.dataset.userid)
    let currentUserName = this.state.usernameArr[userid];// e.currentTarget.dataset.userid
    
    if (this.state.currentPost !== currentPost) {
      
        console.log(`in heree`)
        let comments = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postid}`);
        // console.log(await comments.data)
        this.setState({
          currentPost,
          currentUserName,
          comments: await comments.data,
          postmodal: true
        })
      }
      console.log(`${currentPost} current possst ${this.state.currentPost !== currentPost}`)
      
    }
    

    // let userData = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${e.target.dataset.post}`);
    
      
    
  

  async componentDidMount() {
    this.axiosCancelSource = axios.CancelToken.source()
    let posts = await axios.get("https://jsonplaceholder.typicode.com/posts/");
    console.log(`${posts.data} post dataaaa`)
    await posts.data.map(post => {
      return this.getUser(post.userId)
    });
    this.setState(
      {posts: await posts.data}
    );
  }

  componentWillUnmount() {
    console.log('unmount component')
    this.axiosCancelSource.cancel('Component unmounted.')
  }

  render() {
    return (
      <div className="container">
        <div className="search">
          <Search usernameArr={this.state.usernameArr} toggleUser={this.toggle('modal')}  handleUsernameClick={this.handleSearchUsernameClick}/>
        </div>
        <h2>Posts</h2>
        <ListGroup>
        {this.state.posts.map(post => 
          <ListGroupItem 
            tabIndex="0"
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
              href="0"
              tabIndex="0"
              data-id={post.userId} 
              onClick={this.handleUsernameClick}
              onKeyDown={
                (e) => (e.keyCode === 13) ? this.handleUsernameClick(e):""
              }
            >
              {this.state.usernameArr[post.userId]}
            </a>
          </ListGroupItem>
        )}
        </ListGroup>
        <Suspense fallback={<div>Loading...</div>}>

          <User modal={this.state.modal} toggle={this.toggle('modal')} userdata={this.state.currentUserData} />
          <Post modal={this.state.postmodal} toggle={this.toggle('postmodal')} comments={this.state.comments} postbody={{ title: this.state.currentPost, username: this.state.currentUserName}}/>

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