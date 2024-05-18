import {StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: COLORS.GRAY_LIGHT,
  } as ViewStyle,
});

export default styles;
