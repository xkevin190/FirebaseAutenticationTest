import {StyleSheet, ImageStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
  } as ViewStyle,
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 8,
  } as ViewStyle,

  signInButton: {
    marginTop: 32,
  } as ViewStyle,
});

export default styles;
