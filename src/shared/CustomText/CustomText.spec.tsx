import React from 'react';
import {TextProps, TextStyle} from 'react-native';
import {shallow, ShallowWrapper} from 'enzyme';

import styles from './CustomText.style';
import {COLORS} from '../../constants/styles';
import CustomText, {ICustomTextProps} from './CustomText';

describe('CustomText (Unit-Test)', () => {
  const props: ICustomTextProps = {
    text: 'CUSTOM_TEXT',
  };
  let wrapper: ShallowWrapper;

  describe('general functionality', () => {
    beforeEach(() => {
      wrapper = shallow(<CustomText {...props} />);
    });

    it('should match snapshot', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should render "text" prop', () => {
      const textProps = wrapper.find('Text').props() as TextProps;
      expect(textProps.children).toEqual(props.text);
    });

    it('should render default button style', () => {
      const textProps = wrapper.find('Text').props() as TextProps;
      expect(textProps.style).toEqual({
        ...styles.paragraph,
        color: COLORS.BLACK,
      });
    });

    it('should set "testID" with empty string', () => {
      const textProps = wrapper.find('Text').props() as TextProps;
      expect(textProps.testID).toEqual('');
    });
  });

  describe('when optional props are received', () => {
    it('should render text color with "color" prop received', () => {
      wrapper = shallow(
        <CustomText {...props} color={COLORS.GRAY_LIGHT_DARKER} />,
      );
      const textProps = wrapper.find('Text').props() as TextProps;
      expect(textProps.style).toEqual({
        ...styles.paragraph,
        color: COLORS.GRAY_LIGHT_DARKER,
      });
    });

    it('should render text aligned center when "center" prop received', () => {
      wrapper = shallow(<CustomText {...props} center />);
      const textProps = wrapper.find('Text').props() as TextProps;
      expect(textProps.style).toEqual({
        ...styles.paragraph,
        color: COLORS.BLACK,
        textAlign: 'center',
      });
    });

    it('should render text with styles depending of "bodyType" prop received', () => {
      wrapper = shallow(<CustomText {...props} bodyType="small-paragraph" />);
      const textProps = wrapper.find('Text').props() as TextProps;
      expect(textProps.style).toEqual({
        ...styles['small-paragraph'],
        color: COLORS.BLACK,
      });
    });

    it('should set testID with "testID" prop received', () => {
      wrapper = shallow(<CustomText {...props} testID="TESTING_TEST_ID" />);
      const textProps = wrapper.find('Text').props() as TextProps;
      expect(textProps.testID).toEqual('TESTING_TEST_ID');
    });

    it('should add new styles when "customStyles" prop is received', () => {
      const customStyles: TextStyle = {
        lineHeight: 10,
        margin: 20,
      };
      wrapper = shallow(
        <CustomText
          {...props}
          bodyType="small-paragraph"
          customStyle={customStyles}
        />,
      );
      const textProps = wrapper.find('Text').props() as TextProps;
      expect(textProps.style).toEqual({
        ...styles['small-paragraph'],
        ...customStyles,
        color: COLORS.BLACK,
      });
    });
  });
});
