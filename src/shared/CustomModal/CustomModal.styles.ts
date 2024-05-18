import {StyleSheet, ViewStyle} from 'react-native';

import {COLORS} from '../../constants/styles';

const styles = StyleSheet.create({
  modalBackgroundContainer: {
    backgroundColor: COLORS.BLACK_025,
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  } as ViewStyle,
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: '90%',
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
  } as ViewStyle,
});

export default styles;
