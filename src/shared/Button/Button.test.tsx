// Button.test.tsx
import React from 'react';
import {render, fireEvent, act, waitFor} from '@testing-library/react-native';
import Button from './Button';
import {COLORS} from '../../constants/styles';

describe('Button Component', () => {
  const onPressMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const {toJSON} = render(
      <Button buttonText="Default Button" onPress={() => {}} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('does not call onPress when button is disabled', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <Button buttonText="Disabled" onPress={onPressMock} disabled={true} />,
    );

    waitFor(() => {
      fireEvent.press(getByText('Disabled'));
    });
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('renders with the correct text color when enabled and disabled', () => {
    const {getByText, rerender} = render(
      <Button
        buttonText="Test Text Color"
        onPress={() => {}}
        textColor="green"
      />,
    );
    expect(getByText('Test Text Color').props.style).toMatchObject({
      color: 'green',
    });

    rerender(
      <Button
        buttonText="Test Text Color"
        onPress={() => {}}
        textColor="green"
        disabled={true}
      />,
    );
    expect(getByText('Test Text Color').props.style).toMatchObject({
      color: COLORS.BLACK,
    });
  });

  it('calls onPress when button is enabled', async () => {
    const {getByText} = render(
      <Button buttonText="Press Me" onPress={onPressMock} />,
    );

    await waitFor(() => {
      fireEvent.press(getByText('Press Me'));
    });
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when button is disabled', async () => {
    const {getByText} = render(
      <Button buttonText="Press Me" onPress={onPressMock} disabled={true} />,
    );
    await waitFor(() => {
      fireEvent.press(getByText('Press Me'));
    });
    expect(onPressMock).not.toHaveBeenCalled();
  });
});
