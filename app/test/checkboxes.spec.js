// very basic component test
import React from 'react';
import Checkboxes, { check1, check2} from '../sources/components/Steps/Checkboxes';
import Checkbox from 'material-ui/Checkbox';

describe('<Checkboxes/>', () => {
  it('should have two <Checkbox /> components', () => {
    const wrapper = shallow(<Checkboxes/>);
    expect(wrapper.find(Checkbox)).to.have.length(2);
  });

  it('should have html class wrapper', () => {
    const wrapper = shallow(<Checkboxes/>);
    expect(wrapper.find('.wrapper')).to.have.length(1);
  });

  it('should have html class main', () => {
    const wrapper = shallow(<Checkboxes/>);
    expect(wrapper.find('.main')).to.have.length(1);
  });

  /* I've tried to test material-ui checkbox but it is a lot of hadake I do not have time to play with it...
    it('should change state to true', () => {
      const wrapper = shallow(<Checkboxes/>);
      wrapper.setState({ [check2]: false });
      wrapper.find('#A1').simulate('change', { target: 'input#A1' });
      expect(wrapper.state()[check1]).to.equal(true)
    });
  */
});