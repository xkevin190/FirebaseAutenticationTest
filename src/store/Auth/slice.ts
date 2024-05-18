import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import initialState from './initialState';
import {AccounthActionsTypes} from './constants';
import {
  closeSession,
  createAccount,
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

  if (!result.user) {
    return Promise.reject({
      user: null,
      error: result.error,
    });
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    recoverSession: (state, action) => {
      state.userInfo = action.payload;
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
    builder.addCase(createAccountThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userLogged = true;
      state.accountCreated = true;
    });
    builder.addCase(createAccountThunk.rejected, (state, payload) => {
      state.loading = false;
      state.error = payload.error.code ?? 'unknown error';
    });

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
      state.error = payload.error.code ?? 'unknown error';
    });
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
