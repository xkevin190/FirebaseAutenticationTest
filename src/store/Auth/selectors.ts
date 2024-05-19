import {RootState} from '../../types/redux';

export const getSessionStatus = (state: RootState) => state.auth.loading;

export const authLoading = (state: RootState) => state.auth.loading;

export const getUserInfo = (state: RootState) => state.auth.userInfo;

export const accountCreated = (state: RootState) => state.auth.accountCreated;

export const resetPasswordSent = (state: RootState) =>
  state.auth.resetPasswordSent;

export const errorSignUp = (state: RootState) => state.auth.errorSignUp;

export const errorLogin = (state: RootState) => state.auth.errorLogin;
