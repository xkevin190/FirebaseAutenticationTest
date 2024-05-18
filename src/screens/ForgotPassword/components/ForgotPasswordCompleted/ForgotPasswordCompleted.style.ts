import {StyleSheet, ImageStyle, ViewStyle, TextStyle} from 'react-native';

import {COLORS} from '../../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.GRAY_LIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
  } as ViewStyle,
  verifyEmail: {
    width: '50%',
    height: '20%',
  } as ImageStyle,
  titleContainer: {
    marginTop: 50,
    marginBottom: 20,
  } as TextStyle,
  descriptionContainer: {
    marginBottom: 90,
  } as TextStyle,
});

export default styles;
