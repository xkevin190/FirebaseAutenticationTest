import {configureStore} from '@reduxjs/toolkit';
import authReducer, {
  authActions,
  createAccountThunk,
  signInThunk,
  closeSessionThunk,
  resetPasswordThunk,
} from './slice';
import * as FirebaseAuthService from '../../services/FirebaseAuthService';

import initialState from './initialState';

jest.mock('../store');

jest.mock('@react-native-firebase/auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    sendPasswordResetEmail: jest.fn(),
  })),
}));

jest.mock('../../services/FirebaseAuthService', () => {
  return {
    createAccount: jest.fn(),
    signIn: jest.fn(),
    closeSession: jest.fn(),
    resetPassword: jest.fn(),
  };
});
jest.useFakeTimers();

describe('auth slice', () => {
  const mockCreateAccount = FirebaseAuthService.createAccount as jest.Mock;
  const mockSignIn = FirebaseAuthService.signIn as jest.Mock;
  const mockCloseSession = FirebaseAuthService.closeSession as jest.Mock;
  const mockResetPassword = FirebaseAuthService.resetPassword as jest.Mock;

  let testStore: any;
  beforeEach(() => {
    jest.clearAllMocks();
    testStore = configureStore({
      reducer: {
        auth: authReducer,
      },
    });
  });

  describe('reducers', () => {
    it('should handle initial state', () => {
      expect(testStore.getState().auth).toEqual(initialState);
    });

    it('should handle recoverSession', async () => {
      await testStore.dispatch(authActions.recoverSession({user: 'testUser'}));
      expect(testStore.getState().auth.userInfo).toEqual({user: 'testUser'});
    });

    it('should handle resetError', () => {
      testStore.dispatch(authActions.resetError());
      expect(testStore.getState().auth.errorSignUp).toBeNull();
      expect(testStore.getState().auth.errorLogin).toBeNull();
    });

    it('should handle resetPasswordSent', () => {
      testStore.dispatch(authActions.resetPasswordSent());
      expect(testStore.getState().auth.resetPasswordSent).toBe(false);
    });

    it('should handle resetSuccess', () => {
      testStore.dispatch(authActions.resetSucess());
      expect(testStore.getState().auth.accountCreated).toBe(false);
    });

    it('should handle resetAuth', () => {
      testStore.dispatch(authActions.resetAuth());
      expect(testStore.getState().auth).toEqual(initialState);
    });
  });

  describe('thunks', () => {
    it('should handle createAccountThunk successfully', async () => {
      mockCreateAccount.mockResolvedValue({error: false});

      await testStore.dispatch(
        createAccountThunk({
          email: 'test',
          password: 'test',
          firstName: 'test',
          lastName: 'test',
        }),
      );
      const state = testStore.getState().auth;

      expect(state.loading).toBe(false);
      expect(state.userLogged).toBe(false);
      expect(state.accountCreated).toBe(true);
    });

    it('should handle createAccountThunk with error', async () => {
      mockCreateAccount.mockResolvedValueOnce({error: {code: 'auth/error'}});

      await testStore.dispatch(
        createAccountThunk({
          email: 'test',
          password: 'test',
          firstName: 'test',
          lastName: 'test',
        }),
      );
      const state = testStore.getState().auth;

      expect(state.loading).toBe(false);
      expect(state.errorSignUp).toBe('auth/error');
    });

    it('should handle signInThunk successfully', async () => {
      mockSignIn.mockResolvedValueOnce({user: 'testUser'});

      await testStore.dispatch(
        signInThunk({email: 'test@example.com', password: 'password'}),
      );
      const state = testStore.getState().auth;

      expect(state.loading).toBe(false);
      expect(state.userLogged).toBe(true);
      expect(state.userInfo).toEqual('testUser');
    });

    it('should handle signInThunk with error', async () => {
      mockSignIn.mockResolvedValueOnce({error: {code: 'auth/error'}});

      await testStore.dispatch(
        signInThunk({email: 'test@example.com', password: 'password'}),
      );
      const state = testStore.getState().auth;

      expect(state.loading).toBe(false);
      expect(state.errorLogin).toBe('auth/error');
    });

    it('should handle closeSessionThunk successfully', async () => {
      mockCloseSession.mockResolvedValueOnce(null);

      await testStore.dispatch(closeSessionThunk());
      const state = testStore.getState().auth;

      expect(state.loading).toBe(false);
      expect(state.resetPasswordSent).toBe(true);
      expect(state.userInfo).toBeNull();
    });

    it('should handle closeSessionThunk with error', async () => {
      mockCloseSession.mockResolvedValueOnce('error');

      await testStore.dispatch(closeSessionThunk());
      const state = testStore.getState().auth;

      expect(state.loading).toBe(false);
    });

    it('should handle resetPasswordThunk successfully', async () => {
      mockResetPassword.mockResolvedValueOnce({passwordResetSent: true});

      await testStore.dispatch(resetPasswordThunk('test@example.com'));
      const state = testStore.getState().auth;

      expect(state.loading).toBe(false);
      expect(state.resetPasswordSent).toBe(true);
    });

    it('should handle resetPasswordThunk with error', async () => {
      mockResetPassword.mockResolvedValueOnce({error: {code: 'auth/error'}});

      await testStore.dispatch(resetPasswordThunk('test@example.com'));
      const state = testStore.getState().auth;

      expect(state.loading).toBe(false);
    });
  });
});
