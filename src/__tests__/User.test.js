import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import User from '../components/User';

function setup() {
  const props = {
    modal: jest.bool,
    toggle: jest.fn(),
    userdata: {
      username: 'meghana',
      email: 'meghana@mail.com',
      website: 'meghana.dev',
      companydetails: {
        name: 'my company'
      }
    }
  }

  const enzymeWrapper = shallow(<User {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('User', () => {

  it('should render correctly', () => {
    const { enzymeWrapper } = setup()
    expect(shallowToJson(enzymeWrapper)).toMatchSnapshot();
  });

  it('should have three children', () => {
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

  it('should have ListGroupItem', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ListGroupItem').length).toBe(5)
  });

  it('should have modal footer', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalFooter').length).toBe(1)
  });

  it('Modal Footer should have 2 buttons', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('ModalFooter').children().find('Button').length).toBe(2)
  });

  it('Modal should have isOpen as true', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.setProps({ modal: true })
    expect(enzymeWrapper.find('Modal').props().isOpen).toBe(true)
  });

  it('Modal should have a false isOpen property', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('Modal').props().isOpen).toBe(false)
  });

})