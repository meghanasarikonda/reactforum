import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Post from '../components/Post';

function setup() {
  const props = {
    modal: jest.bool,
    toggle: jest.fn(),
    comments: [],
    postbody: jest.fn()
  }

  const enzymeWrapper = shallow(<Post {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Post', () => {

  it('should render correctly', () => {
    const { enzymeWrapper } = setup()
    expect(shallowToJson(enzymeWrapper)).toMatchSnapshot();
  });

  it('should have four children', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.children().length).toBe(3);
  });

  it('shallow wrapper instance should be null', () => {
    const { enzymeWrapper } = setup()
    const instance = enzymeWrapper.instance();

    expect(instance).toBe(null);
  });

  it('should have modal', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('Modal').length).toBe(1);
  });

  it('should have modal header', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalHeader').length).toBe(1)
  });

  it('should have modal body', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalBody').length).toBe(1)
  });

  it('should have modal footer', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalFooter').length).toBe(1)
  });

  it('Modal Footer should have 2 buttons', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalFooter').children().find('Button').length).toBe(2)
  });

  it('Modal should have a true isOpen property', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({ modal: true })
    expect(enzymeWrapper.find('Modal').props().isOpen).toBe(true)
  });

  it('Modal should have a false isOpen property', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Modal').props().isOpen).toBe(false)
  });

  it('should have primary and secondary buttons', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalFooter').find('Button').at(0).props().color).toBe('primary')
    expect(enzymeWrapper.find('ModalFooter').find('Button').at(1).props().color).toBe('secondary')
  })
 
})