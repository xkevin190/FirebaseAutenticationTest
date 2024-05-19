import auth from '@react-native-firebase/auth';
import {CreateAccountRequest, User} from '../types/FirebaseService';

export const createAccount = async (user: CreateAccountRequest) => {
  try {
    await auth().createUserWithEmailAndPassword(user.email, user.password);
    await auth().currentUser!.updateProfile({
      displayName: `${user.firstName} ${user.lastName}`,
    });
    await auth().signOut();
    return {
      error: false,
    };
  } catch (error) {
    return {
      error: error,
    };
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const result = await auth().signInWithEmailAndPassword(email, password);
    return {
      user: result.user as unknown as User,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error: error,
    };
  }
};

export const closeSession = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    return error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await auth().sendPasswordResetEmail(email);
    return {
      passwordResetSent: true,
      error: null,
    };
  } catch (error) {
    return {
      passwordResetSent: false,
      error: error,
    };
  }
};
