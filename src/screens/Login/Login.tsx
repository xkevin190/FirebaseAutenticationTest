import React, { useState, useCallback } from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/FontAwesome5';

// import type { ILoginBadResponse } from '../../types/authApi';
import { SIGN_UP, FORGOT_PASSWORD } from '../../navigation/routes';
import { Button, CustomText, CustomInput, HyperText } from '../../shared';
// import { useAppDispatch, useAppSelector } from '../../hooks';
// import { authActions, postLogin } from '../../store/auth/slice';
// import { getLoginResponse, getLoginLoading } from '../../store/auth/selectors';
import { useNavigationRootStack } from '../../types/navigation';
// import { ICONS } from '../../constants/assets';
import styles from './Login.styles';
// import {
//   emailRegex,
//   oneDigit,
//   upperAndLower,
//   minimunChar8,
// } from '../../utils/regex';
// import useLoginPermissionPrompt from './hooks/useLoginPermissionPrompt';
// import useLoginAccountBlockedPrompt from './hooks/useLoginAccountBlockedPrompt';
// import useLoginWrongCredentialsPrompt from './hooks/useLoginWrongCredentialsPrompt';
import { COLORS } from '../../constants/styles';

const Login: React.FC = () => {
  // const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  // const loading = useAppSelector(getLoginLoading);
  // const { response: badResponse } = useAppSelector(
  //   getLoginResponse<ILoginBadResponse>,
  // );
  const navigation = useNavigation<useNavigationRootStack>();
  const { t } = useTranslation();

  // useLoginPermissionPrompt();
  // useLoginAccountBlockedPrompt();
  // useLoginWrongCredentialsPrompt();
  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(authActions.resetLogin());
  //   }, []),
  // );

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
            // pattern={[emailRegex]}
            validationsText={[t('login:translation.emailInput.validation')]}
            // required={!!badResponse?.fields?.['body.email']?.message}
          />
          <CustomInput
            value={password}
            title={t('login:translation.passwordInput.label')}
            placeholder={t('login:translation.passwordInput.placeholder')}
            onChangeText={setPassword}
            // validationsText={[
            //   t('login:translation.passwordInput.validations.minimunChar'),
            //   t('login:translation.passwordInput.validations.oneNumber'),
            //   t('login:translation.passwordInput.validations.upperAndLower'),
            // ]}
            // pattern={[oneDigit, upperAndLower, minimunChar8]}
            password={isPasswordHidden}
            // required={!!badResponse?.fields?.['body.password']?.message}
            // icon={
            //   <TouchableOpacity
            //     onPress={() => setIsPasswordHidden(!isPasswordHidden)}
            //   >
            //     <Icon
            //       name={isPasswordHidden ? ICONS.FA5.EYE : ICONS.FA5.EYE_SLASH}
            //       size={15}
            //       color={COLORS.MAIN_DEFAULT}
            //     />
            //   </TouchableOpacity>
            // }
          />
        </KeyboardAvoidingView>
        <HyperText
          onPress={() => navigation.navigate(FORGOT_PASSWORD)}
          customStyles={styles.forgotPasswordContainer}
          text={t('login:translation.forgotPasswordButton')} testID={''}        />
        <Button
          buttonText={t(
            `login:translation.loginButton.${false ? 'loading' : 'label'}`
          )}
          textColor={COLORS.WHITE}
          rounded
          disabled={true}
          onPress={() => console.log("executed!!1")} testID={''}        />
        <HyperText
          onPress={() => navigation.navigate(SIGN_UP)}
          customStyles={styles.signUpButton}
          prefix={t('login:translation.signUp.prefix')}
          text={t('login:translation.signUp.label')} 
          testID={''}        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;
