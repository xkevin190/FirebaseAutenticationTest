import React, {useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import type {useNavigationRootStack} from '../../types/navigation';
import {LOGIN} from '../../navigation/routes';
import {CustomInput, Button, HyperText} from '../../shared';
import {COLORS} from '../../constants/styles';
import CreateAccountCompleted from './components/CreateAccountCompleted';
import styles from './SignUp.styles';
import useAppDispatch from '../../hooks/useAppDispatch';
import {useSingUpForm} from './hooks/useSignUpForm';
import Controller from '../../shared/Controller';
import {createAccountThunk, authActions} from '../../store/Auth/slice';
import {CreateAccountRequest, User} from '../../types/FirebaseService';
import useAppSelector from '../../hooks/useAppSelector';
import {accountCreated, authLoading} from '../../store/Auth/selectors';

const ControlledInputs = Controller(CustomInput);

const SignUp: React.FC = () => {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const {t} = useTranslation();
  const navigation = useNavigation<useNavigationRootStack>();
  const dispatch = useAppDispatch();
  const successful = useAppSelector(accountCreated);
  const loading = useAppSelector(authLoading);

  const {control, watch, handleSubmit} = useSingUpForm({
    email: '',
    lastName: '',
    firstName: '',
    password: '',
  });

  const createAccount = (data: CreateAccountRequest) => {
    dispatch(
      createAccountThunk({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      }),
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(authActions.resetSucess());
      };
    }, []),
  );

  return !successful ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.inputsContainer} behavior="padding">
          <ControlledInputs
            name="firstName"
            control={control}
            title={t('signUp:translation.nameInput.label')}
            placeholder={t('signUp:translation.nameInput.placeholder')}
            value={watch('firstName')}
          />

          <ControlledInputs
            name="lastName"
            control={control}
            value={watch('lastName')}
            title={t('signUp:translation.lastNameInput.label')}
            placeholder={t('signUp:translation.lastNameInput.placeholder')}
          />

          <ControlledInputs
            name="email"
            control={control}
            value={watch('email')}
            title={t('signUp:translation.emailInput.label')}
            placeholder={t('signUp:translation.emailInput.placeholder')}
          />

          <ControlledInputs
            name="password"
            control={control}
            value={watch('password')}
            title={t('signUp:translation.passwordInput.label')}
            placeholder={t('signUp:translation.passwordInput.placeholder')}
            password={isPasswordHidden}
            icon={
              <TouchableOpacity
                onPress={() => setIsPasswordHidden(!isPasswordHidden)}>
                <Icon
                  name={isPasswordHidden ? 'eye' : 'eye-off'}
                  size={15}
                  color={COLORS.MAIN_DEFAULT}
                />
              </TouchableOpacity>
            }
          />
        </KeyboardAvoidingView>
        <Button
          buttonText={t(
            `signUp:translation.createAccountButton.${
              loading ? 'loading' : 'label'
            }`,
          )}
          textColor={COLORS.WHITE}
          rounded
          testID="createAccountButton"
          disabled={loading}
          onPress={handleSubmit(createAccount)}
        />
        <HyperText
          prefix={t('signUp:translation.signIn.prefix')}
          text={t('signUp:translation.signIn.label')}
          customStyles={styles.signInButton}
          onPress={() => navigation.navigate(LOGIN)}
          testID={'signInButton'}
        />
      </View>
    </TouchableWithoutFeedback>
  ) : (
    <CreateAccountCompleted />
  );
};

export default SignUp;
