import {
  ActionCreatorWithoutPayload,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';

import store from '../store';

export type Store = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AuthActions = {
  logout: ActionCreatorWithoutPayload<string>;
  singIn: ActionCreatorWithPayload<userInfo>;
};

export type Actions = {
  authActions: AuthActions;
};
