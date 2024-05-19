import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {CustomInput, Button} from '../../shared';
import {COLORS} from '../../constants/styles';
import ForgotPasswordCompleted from './components/ForgotPasswordCompleted';
import styles from './ForgotPassword.style';
import Controller from '../../shared/Controller';
import {useForgotPasswordForm} from './hooks/useForgotPasswordForm';
import useAppDispatch from '../../hooks/useAppDispatch';
import {authActions, resetPasswordThunk} from '../../store/Auth/slice';
import {authLoading, resetPasswordSent} from '../../store/Auth/selectors';
import useAppSelector from '../../hooks/useAppSelector';
import {useFocusEffect} from '@react-navigation/native';

const ControlledInputs = Controller(CustomInput);

const ForgotPassword: React.FC = () => {
  const loading = useAppSelector(authLoading);
  const sucessfull = useAppSelector(resetPasswordSent);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(authActions.resetPasswordSent());
      };
    }, []),
  );

  const {control, watch, handleSubmit} = useForgotPasswordForm({
    email: '',
  });

  const onSubmit = (data: {email: string}) => {
    dispatch(resetPasswordThunk(data.email));
  };

  return sucessfull ? (
    <ForgotPasswordCompleted />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.inputsContainer} behavior="padding">
          <ControlledInputs
            name="email"
            control={control}
            value={watch('email')}
            title={t('forgotPassword:translation.emailInput.label')}
            placeholder={t('forgotPassword:translation.emailInput.placeholder')}
          />
        </KeyboardAvoidingView>
        <View style={styles.sendEmailButtonContainer}>
          <Button
            buttonText={t(
              `forgotPassword:translation.sendEmailButton.${
                loading ? 'loading' : 'label'
              }`,
            )}
            textColor={COLORS.WHITE}
            rounded
            size="xxl"
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
