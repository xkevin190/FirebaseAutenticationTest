import {StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: COLORS.GRAY_LIGHT,
  } as ViewStyle,
  inputsContainer: {
    width: '100%',
    paddingHorizontal: 24,
    marginBottom: 8,
    marginTop: 40,
  } as ViewStyle,
  sendEmailButtonContainer: {
    width: '100%',
    paddingHorizontal: 24,
  } as ViewStyle,
});

export default styles;
