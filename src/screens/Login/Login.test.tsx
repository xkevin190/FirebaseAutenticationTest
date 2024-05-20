import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContext} from '@react-navigation/native';
import Login from './Login';

let mockDispatch = jest.fn();
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

jest.mock('../../hooks/useAppDispatch', () => {
  return () => mockDispatch;
});

jest.mock('../../hooks/useAppSelector', () => jest.fn());
jest.mock('../../store/Auth/selectors', () => jest.fn());

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.mock('../../store/Auth/slice', () => {
  return {
    signInThunk: jest.fn(),
    authActions: {
      resetError: jest.fn(),
      resetSucess: jest.fn(),
      clearErrors: jest.fn(),
    },
  };
});

const navContext = {
  isFocused: () => true,
  addListener: jest.fn(() => jest.fn()),
};

let Component: RenderResult;

beforeEach(() => {
  Component = render(
    <NavigationContext.Provider value={navContext}>
      <Login />
    </NavigationContext.Provider>,
  );
});

describe('Login component', () => {
  test('renders all input fields', () => {
    const {getByPlaceholderText, toJSON} = Component;

    const emailInput = getByPlaceholderText(
      'login:translation.emailInput.placeholder',
    );
    const passwordInput = getByPlaceholderText(
      'login:translation.passwordInput.placeholder',
    );

    expect(toJSON()).toMatchSnapshot();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  test('submits the form with valid values', async () => {
    const {getByPlaceholderText, getByTestId} = Component;

    const emailInput = getByPlaceholderText(
      'login:translation.emailInput.placeholder',
    );
    const passwordInput = getByPlaceholderText(
      'login:translation.passwordInput.placeholder',
    );
    const submitButton = getByTestId('loginButton');

    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(passwordInput, 'K123456v?');

    expect(emailInput.props.value).toBe('test@gmail.com');
    expect(passwordInput.props.value).toBe('K123456v?');

    await waitFor(() => {
      fireEvent.press(submitButton);
    });
    expect(mockDispatch).toHaveBeenCalled();
  });

  test('displays error message for empty email field', async () => {
    const {getByPlaceholderText, getByTestId, queryAllByTestId} = Component;

    const emailInput = getByPlaceholderText(
      'login:translation.emailInput.placeholder',
    );
    const passwordInput = getByPlaceholderText(
      'login:translation.passwordInput.placeholder',
    );
    const submitButton = getByTestId('loginButton');

    fireEvent.changeText(emailInput, '');
    fireEvent.changeText(passwordInput, '');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(queryAllByTestId('helperText')).toHaveLength(2);
    });
  });
});
