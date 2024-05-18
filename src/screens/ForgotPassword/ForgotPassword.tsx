import React, {useState, useCallback} from 'react';
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

const ControlledInputs = Controller(CustomInput);

const ForgotPassword: React.FC = () => {
  const loading = false; //useAppSelector(getRecoverPasswordLoading);
  const sucessfull = false; //
  const [email, setEmail] = useState('');
  const {t} = useTranslation();

  const {control, watch, handleSubmit} = useForgotPasswordForm({
    email: '',
  });

  const onSubmit = (data: {email: string}) => {};

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
