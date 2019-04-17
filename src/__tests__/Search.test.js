import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Search from '../components/Search';

function setup() {
  const myMock = jest.fn();
  myMock
    .mockReturnValueOnce('called once')
    .mockReturnValueOnce('called twice')
  const myMock2 = jest.fn();
  myMock2
    .mockReturnValueOnce('username called once')
    .mockReturnValueOnce('username called twice')

  const props = {
    toggleUser: myMock,
    handleUsernameClick: myMock2,
    usernameArr: []
  }

  const enzymeWrapper = shallow(<Search {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Search', () => {

  it('should render correctly', () => {
    const { enzymeWrapper } = setup()
    expect(shallowToJson(enzymeWrapper)).toMatchSnapshot();
  });

  it('should have two children', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.children().length).toBe(2);
  });

  it('State should contain length 3', () => {
    const { enzymeWrapper } = setup()
    const instance = enzymeWrapper.instance();
    expect(Object.keys(instance.state).length).toBe(3);
  });

  it('should have modal', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('Modal').length).toBe(1);
  });

  it('should have modal footer', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalFooter').length).toBe(1)
  });

  it('Modal Footer should have a button', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalFooter').children().find('Button').length).toBe(1)
  });

  it('Modal should have isOpen property', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setState({ modal: true })
    expect(enzymeWrapper.find('Modal').props().isOpen).toBe(true)
  });

  it('Should have handleClick method', () => {
    const { enzymeWrapper } = setup();
    expect(Object.keys(enzymeWrapper.instance()).includes('handleClick')).toBe(true)
  });

  it('Should have handleInputChange method', () => {
    const { enzymeWrapper } = setup();
    expect(Object.keys(enzymeWrapper.instance()).includes('handleInputChange')).toBe(true)
  });

  it('Should have handleSuggestionClick method', () => {
    const { enzymeWrapper } = setup();
    expect(Object.keys(enzymeWrapper.instance()).includes('handleSuggestionClick')).toBe(true)
  });

  it('modal should open on handleClick event', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.find('Button').at(0).simulate('click');
    expect(enzymeWrapper.state().modal).toBe(true)
  });

})

describe('Modal body', () => {

  it('should have input tag', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalBody').exists('input')).toBe(true);
  })

  it('should have onChange and onClick handlers', () => {
    const props = {
      toggleUser: jest.fn,
      handleUsernameClick: jest.fn,
      usernameArr: []
    }
  
    const enzymeWrapper = mount(<Search {...props} />)
    let search = {}
    search.value = 'Bret';
    enzymeWrapper.simulate('change')
    expect(!!(enzymeWrapper.state().query)).toBe(false);
    expect(typeof (enzymeWrapper.instance().getInfo)).toBe('function');
  })

  it('input text', () => {
    const { enzymeWrapper } = setup();
    console.log(enzymeWrapper.find('input').text())
  })

  it('should have suggestions as child', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalBody').exists('Suggestions')).toBe(true)
  })

})