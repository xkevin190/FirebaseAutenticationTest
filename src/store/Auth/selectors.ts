import {RootState} from '../../types/redux';

export const getSessionStatus = (state: RootState) => state.auth.loading;

export const authLoading = (state: RootState) => state.auth.loading;

export const getUserInfo = (state: RootState) => state.auth.userInfo;

export const accountCreated = (state: RootState) => state.auth.accountCreated;
