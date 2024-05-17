import React from 'react';
import { ModalProps } from 'react-native';
import { shallow, ShallowWrapper } from 'enzyme';

import { ICustomModalHeaderProps } from './components/CustomModalHeader/CustomModalHeader';
import CustomModal, { ICustomModalProps } from './CustomModal';

describe('CustomModal (Unit-Test)', () => {
  let wrapper: ShallowWrapper;
  const props: ICustomModalProps = {
    onRequestClose: jest.fn(),
    title: 'TEST_MODAL_TITLE',
    visible: true,
    children: null,
  };

  beforeEach(() => {
    wrapper = shallow(<CustomModal {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render modal', () => {
    const modalProps = wrapper.find('Modal').at(0).props() as ModalProps;
    expect(modalProps.visible).toEqual(props.visible);
    expect(modalProps.statusBarTranslucent).toBeTruthy();
    expect(modalProps.animationType).toEqual('fade');
    expect(modalProps.onRequestClose).toEqual(props.onRequestClose);
  });

  it('should render modal header', () => {
    const modalHeaderProps = wrapper
      .find('CustomModalHeader')
      .at(0)
      .props() as ICustomModalHeaderProps;
    expect(modalHeaderProps.title).toEqual(props.title);
    expect(modalHeaderProps.closeModal).toEqual(props.onRequestClose);
  });
});
