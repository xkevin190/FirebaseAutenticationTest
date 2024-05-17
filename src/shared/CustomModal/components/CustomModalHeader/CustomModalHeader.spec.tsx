import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { FontAwesome5IconProps } from 'react-native-vector-icons/FontAwesome5';

import { ICustomTextProps } from '../../../CustomText/CustomText';
import { COLORS } from '../../../../constants/styles';
import { ICONS } from '../../../../constants/assets';
import CustomModalHeader, {
  ICustomModalHeaderProps,
} from './CustomModalHeader';

describe('CustomModalHeader (Unit-Test)', () => {
  let wrapper: ShallowWrapper;
  const props: ICustomModalHeaderProps = {
    title: 'TESTING_TITLE',
    closeModal: jest.fn(),
  };

  beforeEach(() => {
    wrapper = shallow(<CustomModalHeader {...props} />);
  });

  it('should render close icon', () => {
    const iconProps = wrapper
      .find('Icon')
      .at(0)
      .props() as FontAwesome5IconProps;
    expect(iconProps.color).toEqual(COLORS.SECONDARY_LIGHT);
    expect(iconProps.name).toEqual(ICONS.FONTISTO.CLOSE);
    expect(iconProps.size).toEqual(13);
  });

  it('should trigger "onPress" prop when tapped', () => {
    const Icon = wrapper.find('Icon').at(0);
    Icon.simulate('press');
    expect(props.closeModal).toBeCalledTimes(1);
  });

  it('should render "title" prop', () => {
    const textProps = wrapper
      .find('CustomText')
      .at(0)
      .props() as ICustomTextProps;
    expect(textProps.text).toEqual(props.title);
  });
});
