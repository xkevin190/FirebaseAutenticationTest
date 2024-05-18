import {User} from '../../types/FirebaseService';

export interface AuthState {
  userLogged: boolean;
  userInfo?: User | null;
  loading: boolean;
  accountCreated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userLogged: false,
  userInfo: null,
  loading: false,
  accountCreated: false,
  error: null,
};

export default initialState;
