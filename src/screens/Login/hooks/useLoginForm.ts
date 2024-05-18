import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export const useLoginForm = (defaultValues: {
  email: string;
  password: string;
}) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),

    password: Yup.string().required('Password is required'),
  });

  const form = useForm({
    delayError: 100,
    mode: 'onBlur',
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema),
  });

  return form;
};
