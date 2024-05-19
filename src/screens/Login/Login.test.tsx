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
    createAccountThunk: jest.fn(),
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


// describe('SignUp component',  () => {
//   test('renders all input fields',  () => {
//     const {getByPlaceholderText, toJSON} = Component;
//     const firstNameInput = getByPlaceholderText(
//       'signUp:translation.nameInput.placeholder',
//     );
//     const lastNameInput = getByPlaceholderText(
//       'signUp:translation.lastNameInput.placeholder',
//     );
//     const emailInput = getByPlaceholderText(
//       'signUp:translation.emailInput.placeholder',
//     );
//     const passwordInput = getByPlaceholderText(
//       'signUp:translation.passwordInput.placeholder',
//     );

//     expect(toJSON()).toMatchSnapshot();
//     expect(firstNameInput).toBeTruthy();
//     expect(lastNameInput).toBeTruthy();
//     expect(emailInput).toBeTruthy();
//     expect(passwordInput).toBeTruthy();
//   });

//   test('should writte in all input fields', async () => {
//     const {getByPlaceholderText, getByTestId} = Component;
//     const firstNameInput = getByPlaceholderText(
//       'signUp:translation.nameInput.placeholder',
//     );
//     const lastNameInput = getByPlaceholderText(
//       'signUp:translation.lastNameInput.placeholder',
//     );
//     const emailInput = getByPlaceholderText(
//       'signUp:translation.emailInput.placeholder',
//     );
//     const passwordInput = getByPlaceholderText(
//       'signUp:translation.passwordInput.placeholder',
//     );
//     const submitButton = getByTestId('createAccountButton');


//     fireEvent.changeText(firstNameInput, 'John');
//     fireEvent.changeText(lastNameInput, 'Doe');
//     fireEvent.changeText(emailInput, 'test@gmail.com');
//     fireEvent.changeText(passwordInput, 'K123456v?');


//     expect(firstNameInput.props.value).toBe('John');
//     expect(lastNameInput.props.value).toBe('Doe');
//     expect(emailInput.props.value).toBe('test@gmail.com');
//     expect(passwordInput.props.value).toBe('K123456v?');


//     await waitFor(() => {
//         fireEvent.press(submitButton) 
//     });
//     expect(mockDispatch).toHaveBeenCalled();
    
//   });

//   test('should show error in all inputs', async () => {
//     const {getByPlaceholderText, debug, getByTestId, queryAllByTestId, update} =
//       Component;
//     const firstNameInput = getByPlaceholderText(
//       'signUp:translation.nameInput.placeholder',
//     );
//     const lastNameInput = getByPlaceholderText(
//       'signUp:translation.lastNameInput.placeholder',
//     );
//     const emailInput = getByPlaceholderText(
//       'signUp:translation.emailInput.placeholder',
//     );
//     const passwordInput = getByPlaceholderText(
//       'signUp:translation.passwordInput.placeholder',
//     );
//     const submitButton = getByTestId('createAccountButton');

//     fireEvent.changeText(firstNameInput, '');
//     fireEvent.changeText(lastNameInput, '');
//     fireEvent.changeText(emailInput, '');
//     fireEvent.changeText(passwordInput, '');
//     fireEvent.press(submitButton);

//     await waitFor(() => {
//       expect(queryAllByTestId('helperText')).toHaveLength(4);
//     });
    
//   });
// });
