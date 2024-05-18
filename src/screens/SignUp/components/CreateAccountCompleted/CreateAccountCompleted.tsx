import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

import {COLORS} from '../../../../constants/styles';
import {CustomText, HyperText} from '../../../../shared';
import {LOGIN} from '../../../../navigation/routes';
import {useNavigationRootStack} from '../../../../types/navigation';
import styles from './CreateAccountCompleted.styles';

const CreateAccountCompleted: React.FC = () => {
  const {t} = useTranslation();
  const navigation = useNavigation<useNavigationRootStack>();

  return (
    <View style={styles.container}>
      <CustomText
        text={t('signUp:translation.completion.title')}
        color={COLORS.OPYA_BLUE}
        bodyType="large-paragraph"
        customStyle={styles.titleContainer}
      />
      <CustomText
        text={t('signUp:translation.completion.description')}
        color={COLORS.GRAY_DEFAULT_DARKER}
        center
        customStyle={styles.descriptionContainer}
      />
      <HyperText
        prefix={t('signUp:translation.completion.loginButton.prefix')}
        text={t('signUp:translation.completion.loginButton.label')}
        testID={''}
        onPress={() => navigation.navigate(LOGIN)}
      />
    </View>
  );
};

export default CreateAccountCompleted;
