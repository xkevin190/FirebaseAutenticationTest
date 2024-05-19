import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import initialState from './initialState';
import {AccounthActionsTypes} from './constants';
import {
  closeSession,
  createAccount,
  resetPassword,
  signIn,
} from '../../services/FirebaseAuthService';
import {
  CreateAccountRequest,
  SignInRequest,
  User,
} from '../../types/FirebaseService';
import {resetStore} from '../store';

export const createAccountThunk = createAsyncThunk<
  {error: unknown},
  CreateAccountRequest
>(AccounthActionsTypes.CREATE_ACCOUNT, async user => {
  const result = await createAccount(user);

  if (result.error) {
    return Promise.reject(result.error);
  }

  return result;
});

export const signInThunk = createAsyncThunk<
  {user: User | null; error: any},
  SignInRequest
>(AccounthActionsTypes.LOGIN, async ({email, password}) => {
  const result = await signIn(email, password);

  if (result.error) {
    return Promise.reject(result.error);
  }

  return {
    user: result.user,
    error: null,
  };
});

export const closeSessionThunk = createAsyncThunk(
  AccounthActionsTypes.ClOSE_SESSION,
  async () => {
    const result = await closeSession();

    if (result) {
      return Promise.reject(result);
    }

    resetStore();
  },
);

export const resetPasswordThunk = createAsyncThunk<
  {passwordResetSent: boolean; error: unknown},
  string
>(AccounthActionsTypes.RESET_PASSWORD, async email => {
  const result = await resetPassword(email);

  if (result.error) {
    return Promise.reject(result);
  }

  return result;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    recoverSession: (state, action) => {
      state.userInfo = action.payload;
    },
    resetError: state => {
      state.errorSignUp = null;
      state.errorLogin = null;
    },
    resetPasswordSent: state => {
      state.resetPasswordSent = false;
    },
    resetSucess: state => {
      state.accountCreated = false;
    },
    resetAuth: () => initialState,
  },
  extraReducers: builder => {
    // Create Account

    builder.addCase(createAccountThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(createAccountThunk.fulfilled, state => {
      state.loading = false;
      state.accountCreated = true;
    });
    builder.addCase(createAccountThunk.rejected, (state, payload) => {
      state.loading = false;
      state.errorSignUp = payload.error.code ?? 'unknown_error';
    });

    // Sign In

    builder.addCase(signInThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(signInThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userLogged = true;
      state.userInfo = action.payload.user;
    });
    builder.addCase(signInThunk.rejected, (state, payload) => {
      state.loading = false;
      state.errorLogin = payload.error.code ?? 'unknown_error';
    });

    // Close session

    builder.addCase(closeSessionThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(closeSessionThunk.fulfilled, state => {
      state.loading = false;
      state.resetPasswordSent = true;
      state.userInfo = null;
    });
    builder.addCase(closeSessionThunk.rejected, (state, payload) => {
      state.loading = false;
    });

    // Reset password

    builder.addCase(resetPasswordThunk.pending, state => {
      state.loading = true;
    });
    builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.resetPasswordSent = action.payload.passwordResetSent;
    });
    builder.addCase(resetPasswordThunk.rejected, (state, payload) => {
      state.loading = false;
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
