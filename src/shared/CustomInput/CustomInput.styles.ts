import {StyleSheet, TextStyle, ViewStyle} from 'react-native';

import {COLORS, STYLES} from '../../constants/styles';

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 6,
    marginBottom: 18,
    flexDirection: 'row',
  } as ViewStyle,
  input: {
    fontFamily: STYLES.FONT_FAMILY.LATO_REGULAR,
    fontSize: STYLES.FONT_SIZE.PARAGRAPH,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flex: 1,
  } as TextStyle,
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '15%',
  },
  errorContainer: {
    marginBottom: 18,
  } as ViewStyle,
});

export default styles;
