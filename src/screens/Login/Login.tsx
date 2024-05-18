import React, {useState, useCallback} from 'react';
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

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const navigation = useNavigation<useNavigationRootStack>();
  const {t} = useTranslation();

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
          <CustomInput
            value={email}
            title={t('login:translation.emailInput.label')}
            placeholder={t('login:translation.emailInput.placeholder')}
            onChangeText={setEmail}
            validationsText={[t('login:translation.emailInput.validation')]}
          />
          <CustomInput
            value={password}
            title={t('login:translation.passwordInput.label')}
            placeholder={t('login:translation.passwordInput.placeholder')}
            onChangeText={setPassword}
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
            `login:translation.loginButton.${false ? 'loading' : 'label'}`,
          )}
          textColor={COLORS.WHITE}
          rounded
          disabled={true}
          onPress={() => console.log('executed!!1')}
          testID={''}
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
