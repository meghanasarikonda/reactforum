import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import axios from 'axios';
import App from '../components/App';
import MockAdapter from 'axios-mock-adapter';

let mock = new MockAdapter(axios);

mock.onGet('https://jsonplaceholder.typicode.com/posts/').reply(200, (
  [
    { title: 'first post', userId: 1 }
  ]
));

mock.onGet('https://jsonplaceholder.typicode.com/users/1').reply(200, (
  {
    username: 'meghana',
    id: 1
  }
));

mock.onGet('https://jsonplaceholder.typicode.com/comments?postId=1').reply(200, (
  [
    {
      postID: 1,
      id: 1,
      name: "first comment",
      email: "first@mail.com",
      body: "first comment body"
    },
    {
      postID: 1,
      id: 2,
      name: "second comment",
      email: "second@mail.com",
      body: "second comment body"
    }
  ]
));

function setup() {

  const enzymeWrapper = shallow(<App />)

  return {
    enzymeWrapper
  }
}

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders 4 children', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.children().length).toBe(4);
  })

  it('setState of posts on mounting component', async() => {
    const { enzymeWrapper } = setup();
    await enzymeWrapper.instance().componentDidMount()
    expect( await enzymeWrapper.state().posts).toEqual([ { title: 'first post', userId: 1 } ])
  })

  it('setState of usernameArr on mounting component', async() => {
    const { enzymeWrapper } = setup();
     await enzymeWrapper.instance().componentDidMount()
    await (enzymeWrapper.state())
    expect( await enzymeWrapper.state().usernameArr).toEqual([ 'first', 'meghana' ])
  })

  it('should have a ListGroup',() => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('ListGroup').length).toEqual(1)
  })

  it('should have toggle method', () => {
    const { enzymeWrapper } = setup()
    expect(typeof enzymeWrapper.instance().toggle).toEqual('function')
  })

})

describe('ListGroupItem', () => {

  it('should have a single ListGroupItem', async() => {
    const { enzymeWrapper } = setup()
    await enzymeWrapper.instance().componentDidMount()
    expect( await enzymeWrapper.find('ListGroup').find('ListGroupItem').length ).toEqual(1)
  })

  it('should have article and a as children', async() => {
    const { enzymeWrapper } = setup()
    await enzymeWrapper.instance().componentDidMount()
    expect( await enzymeWrapper.find('ListGroup').find('ListGroupItem').find('article').length ).toEqual(1)
    expect( await enzymeWrapper.find('ListGroup').find('ListGroupItem').find('a').length ).toEqual(1)
  })

  it('article should have first post text', async() => {
    const { enzymeWrapper } = setup()
    await enzymeWrapper.instance().componentDidMount()
    expect( await enzymeWrapper.find('ListGroup').find('ListGroupItem').find('article').text() ).toEqual('first post')
    enzymeWrapper.setState({
      usernameArr: ['first', 'meghana']
    })
    expect( await enzymeWrapper.find('ListGroup').find('ListGroupItem').find('a').text()).toBe("meghana")
  })

  test('ListGroupItem onClick', async() => {
    const { enzymeWrapper } = setup()
    await enzymeWrapper.instance().componentDidMount()
    const mockedEvent = {
      currentTarget: {
        dataset: {
          userid: 1,
          postid: 1
        }
      },
      preventDefault: jest.fn
    } 

    const comment = {
      postID: 1,
      id: 1,
      name: "first comment",
      email: "first@mail.com",
      body: "first comment body"
    }
  
    await  enzymeWrapper.instance().handlePostClick(mockedEvent)
    expect(await enzymeWrapper.state().comments[0]).toEqual(comment)
    expect(await enzymeWrapper.state().postmodal).toEqual(true)
    expect(await enzymeWrapper.state().currentPost).toEqual('first post')
  
  })

  test('a tag onClick should call handleUsernameClick', async() => {
    const { enzymeWrapper } = setup()
    let usernameClick = enzymeWrapper.instance().handleUsernameClick = jest.fn();
    
    usernameClick
    .mockReturnValueOnce('called once')
    .mockReturnValueOnce('called twice')
    
    await enzymeWrapper.instance().componentDidMount()
    await enzymeWrapper.find('ListGroup').find('ListGroupItem').find('a').simulate('click')
    expect(usernameClick.mock.calls.length).toBe(1);
  }) 

  test('a tag onKeyDown', async() => {

    const { enzymeWrapper } = setup()

    const mockedEvent = { 
      preventDefault(){}, 
      keyCode: 13, 
    }

    let usernameClick = enzymeWrapper.instance().handleUsernameClick = jest.fn();
    
    await enzymeWrapper.instance().componentDidMount()
    await enzymeWrapper.find('ListGroup').find('ListGroupItem').find('a').simulate('keydown', mockedEvent)
    expect(usernameClick.mock.calls.length).toBe(1);
  })

  test('handleUsername Click', async() => {

    const { enzymeWrapper } = setup()

    const mockedEvent = { 
      preventDefault(){}, 
      stopPropagation(){},
      keyCode: 13, 
      target: {
        dataset: {
          id: 0
        }
      }
    }

    const {target: {dataset: {id}}} = mockedEvent

    
    await enzymeWrapper.instance().handleUsernameClick(mockedEvent)
    expect(await enzymeWrapper.state().modal).toEqual(true)
    expect(enzymeWrapper.state().currentUserData).toEqual(enzymeWrapper.state().posts[id])
    
  })
})
