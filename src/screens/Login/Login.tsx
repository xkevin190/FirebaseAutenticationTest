import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {SIGN_UP, FORGOT_PASSWORD} from '../../navigation/routes';
import {Button, CustomText, CustomInput, HyperText} from '../../shared';

import {useNavigationRootStack} from '../../types/navigation';
import styles from './Login.styles';
import {COLORS} from '../../constants/styles';
import Controller from '../../shared/Controller';
import {useLoginForm} from './hooks/useLoginForm';
import {SignInRequest} from '../../types/FirebaseService';
import {authActions, signInThunk} from '../../store/Auth/slice';
import useAppDispatch from '../../hooks/useAppDispatch';
import {authLoading, errorLogin} from '../../store/Auth/selectors';
import useAppSelector from '../../hooks/useAppSelector';

const ControlledInputs = Controller(CustomInput);

const Login: React.FC = () => {
  const [isPasswordHidden] = useState(true);
  const navigation = useNavigation<useNavigationRootStack>();
  const dispatch = useAppDispatch();
  const error = useAppSelector(errorLogin);

  const loading = useAppSelector(authLoading);
  const {t} = useTranslation();

  const {control, watch, handleSubmit, setError, clearErrors} = useLoginForm({
    email: '',
    password: '',
  });

  const signIn = (data: SignInRequest) => {
    dispatch(authActions.resetError());
    dispatch(signInThunk(data));
  };

  useFocusEffect(
    React.useCallback(() => {
      clearErrors();
      return () => {
        dispatch(authActions.resetError());
      };
    }, []),
  );

  useEffect(() => {
    if (error) {
      setError('email', {
        type: 'manual',
        message: '',
      });

      setError('password', {
        type: '',
        message: t(`signUp:translation.signUpError.${error}`),
      });
    }
  }, [error]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CustomText
          bodyType="large-paragraph"
          center
          color={COLORS.OPYA_BLUE}
          text={t('login:translation.title')}
          customStyle={styles.subtitleContainer}
        />
        <KeyboardAvoidingView style={styles.inputsContainer} behavior="padding">
          <ControlledInputs
            name="email"
            control={control}
            value={watch('email')}
            title={t('login:translation.emailInput.label')}
            placeholder={t('login:translation.emailInput.placeholder')}
          />
          <ControlledInputs
            name="password"
            control={control}
            value={watch('password')}
            title={t('login:translation.passwordInput.label')}
            placeholder={t('login:translation.passwordInput.placeholder')}
            password={isPasswordHidden}
          />
        </KeyboardAvoidingView>
        <HyperText
          onPress={() => navigation.navigate(FORGOT_PASSWORD)}
          customStyles={styles.forgotPasswordContainer}
          text={t('login:translation.forgotPasswordButton')}
          testID={''}
        />
        <Button
          buttonText={t(
            `login:translation.loginButton.${loading ? 'loading' : 'label'}`,
          )}
          textColor={COLORS.WHITE}
          rounded
          disabled={loading}
          onPress={handleSubmit(signIn)}
          testID={'loginButton'}
        />
        <HyperText
          onPress={() => navigation.navigate(SIGN_UP)}
          customStyles={styles.signUpButton}
          prefix={t('login:translation.signUp.prefix')}
          text={t('login:translation.signUp.label')}
          testID={''}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
