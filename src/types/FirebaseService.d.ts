export interface CreateAccountRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface User {
  displayName: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  photoURL: string | null;
  providerId: string;
  refreshToken: string;
  tenantId: string | null;
  uid: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}
