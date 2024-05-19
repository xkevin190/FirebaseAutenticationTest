import {User} from '../../types/FirebaseService';

export interface AuthState {
  userLogged: boolean;
  userInfo?: User | null;
  loading: boolean;
  accountCreated: boolean;
  resetPasswordSent: boolean;
  errorLogin: string | null;
  errorSignUp: string | null;
}

const initialState: AuthState = {
  userLogged: false,
  userInfo: null,
  loading: false,
  accountCreated: false,
  resetPasswordSent: false,
  errorLogin: null,
  errorSignUp: null,
};

export default initialState;
