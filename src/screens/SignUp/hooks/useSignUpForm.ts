import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import {CreateAccountRequest} from '../../../types/FirebaseService';

export const useSingUpForm = (defaultValues: CreateAccountRequest) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    lastName: Yup.string()
      .min(2, 'Last name must be at least 2 characters long')
      .required('Last name is required'),
    firstName: Yup.string()
      .min(2, 'First name must be at least 2 characters long')
      .required('First name is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(
        /[@$!%*?&]/,
        'Password must contain at least one special character',
      )
      .required('Password is required'),
  });

  const form = useForm({
    delayError: 100,
    mode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  return form;
};
