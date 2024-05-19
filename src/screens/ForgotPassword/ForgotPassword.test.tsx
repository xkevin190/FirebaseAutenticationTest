import React from 'react';
import {
  render,
  fireEvent,
  RenderResult,
  waitFor,
} from '@testing-library/react-native';
import {NavigationContext} from '@react-navigation/native';
import ForgotPassword from './ForgotPassword';

let mockDispatch = jest.fn();
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');

jest.mock('../../hooks/useAppDispatch',  () => {
    return ()=> mockDispatch;
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
    resetPasswordThunk: jest.fn(),
    authActions: {
      resetError: jest.fn(),
      resetPasswordSent: jest.fn(),
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
      <ForgotPassword />
    </NavigationContext.Provider>,
  );
});


describe('ForgotPassword component',  () => {
  test('renders all input fields',  () => {
    const {getByPlaceholderText, toJSON} = Component;
   
    const emailInput = getByPlaceholderText(
      'forgotPassword:translation.emailInput.placeholder',
    );

    expect(toJSON()).toMatchSnapshot();
    expect(emailInput).toBeTruthy();
  });

  test('submits the form with valid email', async () => {
    const {getByPlaceholderText, getByTestId} = Component;

    const emailInput = getByPlaceholderText(
      'forgotPassword:translation.emailInput.placeholder',
    );
  
    const submitButton = getByTestId('resetPasswordButton');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    expect(emailInput.props.value).toBe('test@gmail.com');

    await waitFor(() => {
        fireEvent.press(submitButton) 
    });
    expect(mockDispatch).toHaveBeenCalled();
    
  });

  test('displays error message for empty email field', async () => {
    const {getByPlaceholderText,getByTestId, queryAllByTestId} =
      Component;
    
    const emailInput = getByPlaceholderText(
      'forgotPassword:translation.emailInput.placeholder',
    );
   
    const submitButton = getByTestId('resetPasswordButton');

    fireEvent.changeText(emailInput, '');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(queryAllByTestId('helperText')).toHaveLength(1);
    });
    
  });
});
