import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import CustomInput from './CustomInput'; // Adjust the import path as necessary
import {COLORS} from '../../constants/styles';
import {View} from 'react-native';

describe('CustomInput Component', () => {
  const onChangeTextMock = jest.fn();
  const onFocusMock = jest.fn();
  const onBlurMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    const {getByPlaceholderText} = render(
      <CustomInput placeholder="Enter text" value="" />,
    );
    expect(getByPlaceholderText('Enter text')).toBeTruthy();
  });

  it('renders title when provided', () => {
    const {getByText} = render(
      <CustomInput title="Username" placeholder="Enter username" value="" />,
    );
    expect(getByText('USERNAME')).toBeTruthy();
  });

  it('calls onChangeText when text changes', () => {
    const {getByPlaceholderText} = render(
      <CustomInput
        placeholder="Enter text"
        value=""
        onchangeText={onChangeTextMock}
      />,
    );
    fireEvent.changeText(getByPlaceholderText('Enter text'), 'new text');
    expect(onChangeTextMock).toHaveBeenCalledWith('new text');
  });

  it('calls onFocus and onBlur when input is focused and blurred', () => {
    const {getByPlaceholderText} = render(
      <CustomInput
        placeholder="Enter text"
        value=""
        onFocus={onFocusMock}
        onBlur={onBlurMock}
      />,
    );
    const input = getByPlaceholderText('Enter text');
    fireEvent(input, 'focus');
    expect(onFocusMock).toHaveBeenCalled();

    fireEvent(input, 'blur');
    expect(onBlurMock).toHaveBeenCalled();
  });

  it('renders with error styles when error prop is true', () => {
    const {getByPlaceholderText} = render(
      <CustomInput
        placeholder="Enter text"
        value=""
        error={true}
        helperText="Error message"
      />,
    );
    const input = getByPlaceholderText('Enter text');
    expect(input.props.style).toEqual(
      expect.objectContaining({color: COLORS.ALERT_DEFAULT}),
    );
  });

  it('renders helper text when provided', () => {
    const {getByText} = render(
      <CustomInput
        placeholder="Enter text"
        value=""
        error={true}
        helperText="Error message"
      />,
    );
    expect(getByText('Error message')).toBeTruthy();
  });

  it('renders with custom height when provided', () => {
    const {getByPlaceholderText} = render(
      <CustomInput placeholder="Enter text" value="" height={100} />,
    );
    const input = getByPlaceholderText('Enter text');
    expect(input.props.style).toEqual(expect.objectContaining({height: 100}));
  });

  it('renders the icon when provided', () => {
    const {getByTestId} = render(
      <CustomInput
        placeholder="Enter text"
        value=""
        icon={<View testID="icon" />}
      />,
    );
    expect(getByTestId('icon')).toBeTruthy();
  });

  it('renders as a password input when password prop is true', () => {
    const {getByPlaceholderText} = render(
      <CustomInput placeholder="Enter text" value="" password={true} />,
    );
    const input = getByPlaceholderText('Enter text');
    expect(input.props.secureTextEntry).toBe(true);
  });
});
