import React from 'react';
import {shallow} from 'enzyme';
import {TouchableOpacityProps} from 'react-native';

import {COLORS} from '../../constants/styles';
import {ICustomTextProps} from '../CustomText/CustomText';
import HyperText, {IHyperTextProps} from './HyperText';

describe('HyperText (Unit-Test)', () => {
  const props: IHyperTextProps = {
    testID: 'TEST_ID',
    onPress: jest.fn(),
    text: 'TEST_TEXT',
  };
  let wrapper = shallow(<HyperText {...props} />);

  describe('general functionality', () => {
    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render default button with "testID" prop', () => {
      const buttonProps = wrapper
        .find('TouchableOpacity')
        .props() as TouchableOpacityProps;
      expect(buttonProps.testID).toEqual(props.testID);
    });

    it('should call "onPress" prop when tapped', () => {
      const button = wrapper.find('TouchableOpacity');
      button.simulate('press');
      expect(props.onPress).toBeCalledTimes(1);
    });

    it('should render "text" prop', () => {
      const textProps = wrapper.find('CustomText').props() as ICustomTextProps;
      expect(textProps.text).toEqual(props.text);
      expect(textProps.color).toEqual(COLORS.OPYA_BLUE);
    });
  });

  describe('when optional props are received', () => {
    it('should render "text" with "textColor" prop received', () => {
      wrapper = shallow(
        <HyperText {...props} textColor={COLORS.GRAY_DEFAULT} />,
      );
      const textProps = wrapper.find('CustomText').props() as ICustomTextProps;
      expect(textProps.color).toEqual(COLORS.GRAY_DEFAULT);
    });

    it('should render prefix text when "prefix" prop received', () => {
      wrapper = shallow(<HyperText {...props} prefix="TEST_PREFIX" />);
      const textProps = wrapper
        .find('CustomText')
        .at(0)
        .props() as ICustomTextProps;
      expect(textProps.text).toEqual('TEST_PREFIX ');
      expect(textProps.color).toEqual(COLORS.GRAY_MEDIUM);
    });

    it('should render prefix text with "prefixColor" prop received', () => {
      wrapper = shallow(
        <HyperText
          {...props}
          prefix="TEST_PREFIX"
          prefixColor={COLORS.ALERT_LIGHT}
        />,
      );
      const textProps = wrapper
        .find('CustomText')
        .at(0)
        .props() as ICustomTextProps;
      expect(textProps.color).toEqual(COLORS.ALERT_LIGHT);
    });

    it('should render button with "customStyle" prop when received', () => {
      wrapper = shallow(<HyperText {...props} customStyles={{}} />);
      const buttonProps = wrapper
        .find('TouchableOpacity')
        .props() as TouchableOpacityProps;
      expect(buttonProps.style).toEqual({});
    });
  });
});
