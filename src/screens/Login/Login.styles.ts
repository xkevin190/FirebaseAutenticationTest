import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';

import { COLORS } from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: COLORS.GRAY_LIGHT,
  } as ViewStyle,
  opyaLogo: {
    width: '50%',
    height: '20%',
  } as ImageStyle,
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 8,
  } as ViewStyle,
  subtitleContainer: {
    marginBottom: 40,
  } as TextStyle,
  signUpButton: {
    marginTop: 32,
  } as ViewStyle,
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: 40,
    marginBottom: 30,
  } as ViewStyle,
});

export default styles;
