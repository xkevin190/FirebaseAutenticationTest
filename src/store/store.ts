import {configureStore} from '@reduxjs/toolkit';
import authReducer, {authActions} from './Auth/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const resetStore = () => {
  store.dispatch(authActions.resetAuth());
};

export default store;
