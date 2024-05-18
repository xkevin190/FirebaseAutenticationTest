import React, {useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import type {useNavigationRootStack} from '../../types/navigation';
import {LOGIN} from '../../navigation/routes';

import {CustomInput, Button, HyperText} from '../../shared';
import {COLORS} from '../../constants/styles';

import CreateAccountCompleted from './components/CreateAccountCompleted';

import styles from './SignUp.styles';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const {t} = useTranslation();
  const navigation = useNavigation<useNavigationRootStack>();
  const successful = false;
  const loading = false;

  return !successful ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.inputsContainer} behavior="padding">
          <CustomInput
            value={name}
            title={t('signUp:translation.nameInput.label')}
            placeholder={t('signUp:translation.nameInput.placeholder')}
            onChangeText={setName}
          />
          <CustomInput
            value={lastName}
            title={t('signUp:translation.lastNameInput.label')}
            placeholder={t('signUp:translation.lastNameInput.placeholder')}
            onChangeText={setLastName}
          />
          <CustomInput
            value={email}
            title={t('signUp:translation.emailInput.label')}
            placeholder={t('signUp:translation.emailInput.placeholder')}
            onChangeText={setEmail}
            validationsText={[t('signUp:translation.emailInput.validation')]}
          />
          <CustomInput
            value={password}
            title={t('signUp:translation.passwordInput.label')}
            placeholder={t('signUp:translation.passwordInput.placeholder')}
            onChangeText={setPassword}
            validationsText={[
              t('signUp:translation.passwordInput.validations.minimunChar'),
              t('signUp:translation.passwordInput.validations.oneNumber'),
              t('signUp:translation.passwordInput.validations.upperAndLower'),
            ]}
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
          onPress={() => console.log('Create Account')}
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
