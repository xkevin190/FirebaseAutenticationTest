import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import HyperText from './HyperText'; // Adjust the import path as necessary
import {COLORS} from '../../constants/styles';

describe('HyperText Component', () => {
  const onPressMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with required props', () => {
    const {getByText} = render(
      <HyperText text="Click here" testID="hypertext" onPress={onPressMock} />,
    );
    expect(getByText('Click here')).toBeTruthy();
  });

  it('renders with prefix and correct colors', () => {
    const {getByText} = render(
      <HyperText
        prefix="Prefix"
        text="Click here"
        prefixColor={COLORS.GRAY_MEDIUM}
        textColor={COLORS.OPYA_BLUE}
        testID="hypertext"
        onPress={onPressMock}
      />,
    );
    expect(getByText('Prefix')).toBeTruthy();
    expect(getByText('Prefix').props.style.color).toBe(COLORS.GRAY_MEDIUM);
    expect(getByText('Click here').props.style.color).toBe(COLORS.OPYA_BLUE);
  });

  it('calls onPress when pressed', () => {
    const {getByTestId} = render(
      <HyperText text="Click here" testID="hypertext" onPress={onPressMock} />,
    );
    fireEvent.press(getByTestId('hypertext'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('applies custom styles', () => {
    const customStyles = {padding: 10};
    const {getByTestId} = render(
      <HyperText
        text="Click here"
        testID="hypertext"
        onPress={onPressMock}
        customStyles={customStyles}
      />,
    );
    expect(getByTestId('hypertext').props.style).toEqual(
      expect.objectContaining(customStyles),
    );
  });
});
