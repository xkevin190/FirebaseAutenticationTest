import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {authActions} from '../store/Auth/slice';
import useAppDispatch from './useAppDispatch';

export const useVerifySession = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (auth().currentUser) {
      dispatch(authActions.recoverSession(auth().currentUser));
    }
  }, []);
};
