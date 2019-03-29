import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function Newapp()  {

  const [postdata, setPostdata] = useState([]);
  const [userArr, setUser] = useState([])

  function getUser(id) {
    console.log('her')
    const fetchUser = async () => {
      try {
        let user = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        if(!userArr[id]) {
          let userarr = userArr;
          userarr[id] = user.data.name
          console.log(userArr, 'userArr')
          return setUser(userarr)
        }
      }
      catch (error) {
        console.log(error);
      }
    }
    fetchUser(id);
  }

  useEffect(() => {
    console.log('hmm')
    const fetchData = async () => {
      let posts = await axios.get("https://jsonplaceholder.typicode.com/posts/");
      // console.log(Array.)
      posts.data.map(post => {
        getUser(post.userId)
        return (
          <div key={post.id} className="displayposts">
            <h4>{post.title}</h4>
            <p>{userArr[post.userId]}</p>
          </div>
        )
      });
      setPostdata(posts.data);
    };
    fetchData();
  }, []);
  console.log(postdata, 'posst');

  
  
  console.log(userArr, 'userArrayyy')
  return (
    <div className="App">
      <h1>Hello</h1>
      {setTimeout(()=>postdata.map(post => 
         (<div key={post.id} className="displayposts">
          <h4>{post.title}</h4>
          <p>{userArr[1]}</p>
        </div>)
      
      )
       , 0)}
    </div>
  );
  
}

export default Newapp;
