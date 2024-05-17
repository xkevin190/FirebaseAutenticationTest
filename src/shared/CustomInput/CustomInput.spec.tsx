import React from 'react';
import {
  TextInputProps,
  TextStyle,
  ViewProps,
  ViewStyle,
  Text,
  TextProps,
} from 'react-native';
import { shallow, ShallowWrapper } from 'enzyme';

import { ICustomTextProps } from '../CustomText/CustomText';
import { COLORS } from '../../constants/styles';
import { emailRegex } from '../../utils/regex';
import CustomInput, { ICustomInputProps } from './CustomInput';

describe('CustomInput (Unit-Test)', () => {
  const props: ICustomInputProps = {
    value: 'TEST_INPUT',
    placeholder: 'TEST_PLACEHOLDER',
    onChangeText: jest.fn(),
  };
  let wrapper: ShallowWrapper;

  describe('general functionality', () => {
    beforeEach(() => {
      wrapper = shallow(<CustomInput {...props} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders transparent background button to hide keyboard', () => {
      const button = wrapper.find('TouchableWithoutFeedback').at(0);
      expect(button).toBeDefined();
    });

    it('should render TextInput with "placeholder" prop', () => {
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      expect(inputProps.placeholder).toEqual(props.placeholder);
    });

    it('should render TextInput with "GRAY_MEDIUM" placeholder color', () => {
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      expect(inputProps.placeholderTextColor).toEqual(COLORS.GRAY_MEDIUM);
    });

    it('should render TextInput with "BLACK" color', () => {
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      const inputStyles = inputProps.style as TextStyle;
      expect(inputStyles.color).toEqual(COLORS.BLACK);
    });

    it('should render TextInput with "GRAY_MEDIUM" border color', () => {
      const containerProps = wrapper.find('View').at(0).props() as ViewProps;
      const containerStyles = containerProps.style as ViewStyle;
      expect(containerStyles.borderColor).toEqual(COLORS.GRAY_MEDIUM);
    });

    it('should render TextInput with "value" prop', () => {
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      expect(inputProps.value).toEqual(props.value);
    });

    it('should render TextInput with "multiline" false', () => {
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      expect(inputProps.multiline).toBeFalsy();
    });

    it('should call "onChangeText" prop once with new "value" when changing text', () => {
      const input = wrapper.find('TextInput').at(0);
      const newValue = 'TEST_INPUT_CHANGED';
      input.simulate('changeText', newValue);
      expect(props.onChangeText).toBeCalledTimes(1);
      expect(props.onChangeText).toBeCalledWith(newValue);
    });

    it('should render TextInput with "numberOfLines" as one', () => {
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      expect(inputProps.numberOfLines).toEqual(1);
    });

    it('should render TextInput with "textAlignVertical" as "auto"', () => {
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      expect(inputProps.textAlignVertical).toEqual('auto');
    });
  });

  describe('when optional props are received', () => {
    it('should render title when "title" prop is received', () => {
      const title = 'TEST_TITLE_INPUT';
      wrapper = shallow(<CustomInput {...props} title={title} />);
      const text = wrapper.find('CustomText').at(0).props() as ICustomTextProps;
      expect(text.text).toEqual(title);
      expect(text.color).toEqual(COLORS.GRAY_MEDIUM);
    });

    it('should render TextInput with alert color and required field when "required" prop is received', () => {
      const title = 'TEST_TITLE_INPUT';
      wrapper = shallow(
        <CustomInput {...props} title={title} required value="" />,
      );
      const titleTextProps = wrapper
        .find('CustomText')
        .at(0)
        .props() as ICustomTextProps;
      const requiredTextProps = wrapper
        .find('CustomText')
        .at(1)
        .props() as ICustomTextProps;
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      const containerProps = wrapper.find('View').at(0).props() as ViewProps;
      const inputStyles = inputProps.style as TextStyle;
      const containerStyles = containerProps.style as ViewStyle;
      expect(titleTextProps.text).toEqual(title);
      expect(titleTextProps.color).toEqual(COLORS.ALERT_DEFAULT);
      expect(inputStyles.color).toEqual(COLORS.ALERT_DEFAULT);
      expect(containerStyles.borderColor).toEqual(COLORS.ALERT_DEFAULT);
      expect(inputProps.placeholderTextColor).toEqual(COLORS.ALERT_DEFAULT);
      expect(requiredTextProps.color).toEqual(COLORS.ALERT_DEFAULT);
      expect(requiredTextProps.text).toEqual(
        '- general:translation.requiredField',
      );
    });

    it('should render TextInput with "height" prop', () => {
      const height = 10;
      wrapper = shallow(<CustomInput {...props} height={height} />);
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      const inputStyles = inputProps.style as TextStyle;
      expect(inputStyles.height).toEqual(height);
    });

    it('should render TextInput with "multiline", "numberOfLines" as ten and textAlignVertical as "top" when "textArea" prop is recieved', () => {
      wrapper = shallow(<CustomInput {...props} textArea />);
      const inputProps = wrapper
        .find('TextInput')
        .at(0)
        .props() as TextInputProps;
      expect(inputProps.multiline).toBeTruthy();
      expect(inputProps.numberOfLines).toEqual(10);
      expect(inputProps.textAlignVertical).toEqual('top');
    });

    it('should render validation field when "pattern" and "validationsText" prop are received', () => {
      const validationsText = ['TEST_VALIDATION'];
      wrapper = shallow(
        <CustomInput
          {...props}
          pattern={[emailRegex]}
          validationsText={validationsText}
        />,
      );
      const input = wrapper.find('TextInput').at(0);
      const newValue = 'TEST_EMAIL_INCORRECT';
      input.simulate('changeText', newValue);
      const textProps = wrapper
        .find('CustomText')
        .at(0)
        .props() as ICustomTextProps;
      expect(textProps.text).toEqual('- TEST_VALIDATION');
      expect(textProps.color).toEqual(COLORS.ALERT_DEFAULT);
    });

    it('should render icon when "icon" prop recieved', () => {
      wrapper = shallow(
        <CustomInput {...props} icon={<Text>TEST_ICON</Text>} />,
      );
      const iconProps = wrapper.find('Text').at(0).props() as TextProps;
      expect(iconProps.children).toEqual('TEST_ICON');
    });
  });
});
