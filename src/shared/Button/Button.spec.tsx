import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { shallow, ShallowWrapper } from 'enzyme';

import styles from './Button.styles';
import { ICustomTextProps } from '../CustomText/CustomText';
import { COLORS } from '../../constants/styles';
import Button, { IButtonProps } from './Button';

describe('Button (Unit-Test)', () => {
  const props: IButtonProps = {
    buttonText: 'BUTTON_TEXT',
    onPress: jest.fn(),
    testID: 'BUTTON_TEST_ID',
  };
  let wrapper: ShallowWrapper;

  describe('general functionality', () => {
    beforeEach(() => {
      wrapper = shallow(<Button {...props} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render "buttonText" prop', () => {
      const textProps = wrapper.find('CustomText').props() as ICustomTextProps;
      expect(textProps.text).toEqual(props.buttonText);
    });

    it('should render default button style', () => {
      const buttonProps = wrapper
        .find('TouchableOpacity')
        .props() as TouchableOpacityProps;
      expect(buttonProps.style).toEqual({
        ...styles.md,
        backgroundColor: COLORS.OPYA_BLUE,
        borderRadius: 0,
      });
    });

    it('should set "testID" prop received to "testID" prop of button', () => {
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
  });

  describe('when optional props are received', () => {
    it('should render button background color with "color" prop received', () => {
      wrapper = shallow(<Button {...props} color={COLORS.BLACK} />);
      const buttonProps = wrapper
        .find('TouchableOpacity')
        .props() as TouchableOpacityProps;
      expect(buttonProps.style).toEqual({
        ...styles.md,
        backgroundColor: COLORS.BLACK,
        borderRadius: 0,
      });
    });

    it('should render button borderRadius when "rounded" prop received', () => {
      wrapper = shallow(<Button {...props} rounded />);
      const buttonProps = wrapper
        .find('TouchableOpacity')
        .props() as TouchableOpacityProps;
      expect(buttonProps.style).toEqual({
        ...styles.md,
        backgroundColor: COLORS.OPYA_BLUE,
        borderRadius: 25,
      });
    });

    it('should render "buttonText" with "textColor" prop received', () => {
      wrapper = shallow(<Button {...props} textColor={COLORS.GRAY_DEFAULT} />);
      const textProps = wrapper.find('CustomText').props() as ICustomTextProps;
      expect(textProps.color).toEqual(COLORS.GRAY_DEFAULT);
    });

    it('should render disabled button when "disabled" prop its received', () => {
      wrapper = shallow(<Button {...props} disabled />);
      const textProps = wrapper.find('CustomText').props() as ICustomTextProps;
      const buttonProps = wrapper
        .find('TouchableOpacity')
        .props() as TouchableOpacityProps;
      expect(buttonProps.disabled).toEqual(true);
      expect(buttonProps.style).toEqual({
        ...styles.md,
        borderRadius: 0,
        backgroundColor: COLORS.DISABLED_DEFAULT,
      });
      expect(textProps.color).toEqual(COLORS.BLACK);
    });
  });
});
