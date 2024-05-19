import * as React from 'react';
import {View} from 'react-native';
import {Button} from '../../shared';
import {COLORS} from '../../constants/styles';
import {useTranslation} from 'react-i18next';
import styles from './styles';
import {closeSessionThunk} from '../../store/Auth/slice';
import useAppDispatch from '../../hooks/useAppDispatch';

const Home = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const closeSession = () => {
    dispatch(closeSessionThunk());
  };

  return (
    <View style={styles.container}>
      <Button
        buttonText={t(`login:translation.closeSessionButton`)}
        textColor={COLORS.WHITE}
        rounded
        disabled={false}
        onPress={closeSession}
      />
    </View>
  );
};

export default Home;
