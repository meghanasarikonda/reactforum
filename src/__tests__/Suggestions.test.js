import React from 'react';
import Enzyme, { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Suggestions from '../components/Suggestions';

function setup() {
  const myMock = jest.fn();
  myMock
    .mockReturnValueOnce('called once')
    .mockReturnValueOnce('called twice')

  const props = {
    results: [{username: 'Meghana', id: 1}],
    click: myMock
  }

  const enzymeWrapper = shallow(<Suggestions {...props} />)

  return {
    props,
    enzymeWrapper
  }
}

describe('Suggestions', () => {

  it('should render correctly', () => {
    const { enzymeWrapper } = setup()
    expect(shallowToJson(enzymeWrapper)).toMatchSnapshot();
  });

  it('should have 1 children', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.children().length).toBe(1);
  });

  it('onClick handler should call click prop', () => {
    const { enzymeWrapper, props } = setup()
    enzymeWrapper.find('div').simulate('click')
    expect(props.click.mock.calls.length).toBe(1);
    expect(props.click.mock.results[0].value).toBe('called once');
  });

  it('should render username', () => {
    const { enzymeWrapper, props } = setup()
    expect(enzymeWrapper.find('div').text()).toBe(props.results[0]['username'])
  });

  it('should contain div', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.exists('div')).toBe(true)
  });

  it('should return ul', () => {
    const { enzymeWrapper } = setup()
    expect(enzymeWrapper.find('ul').length).toEqual(1)
  });

})