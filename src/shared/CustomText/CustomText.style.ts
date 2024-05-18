import {StyleSheet, TextStyle} from 'react-native';

import {STYLES} from '../../constants/styles';

const styles = StyleSheet.create({
  'small-paragraph-bold': {
    fontFamily: STYLES.FONT_FAMILY.LATO_BOLD,
    fontSize: STYLES.FONT_SIZE.SMALL_PARAGRAPH,
  } as TextStyle,
  'small-paragraph': {
    fontFamily: STYLES.FONT_FAMILY.LATO_REGULAR,
    fontSize: STYLES.FONT_SIZE.SMALL_PARAGRAPH,
  } as TextStyle,
  'medium-paragraph': {
    fontFamily: STYLES.FONT_FAMILY.LATO_REGULAR,
    fontSize: STYLES.FONT_SIZE.MEDIUM_PARAGRAPH,
  } as TextStyle,
  paragraph: {
    fontFamily: STYLES.FONT_FAMILY.LATO_REGULAR,
    fontSize: STYLES.FONT_SIZE.PARAGRAPH,
  } as TextStyle,
  'large-paragraph': {
    fontFamily: STYLES.FONT_FAMILY.LATO_REGULAR,
    fontSize: STYLES.FONT_SIZE.LARGE_PARAGRAPH,
  } as TextStyle,
  'paragraph-bold': {
    fontFamily: STYLES.FONT_FAMILY.LATO_BOLD,
    fontSize: STYLES.FONT_SIZE.PARAGRAPH,
  } as TextStyle,
  'intermedium-paragraph-bold': {
    fontFamily: STYLES.FONT_FAMILY.LATO_BOLD,
    fontSize: STYLES.FONT_SIZE.INTERMEDIUM_PARAGRAPH,
  } as TextStyle,
  'intermedium-paragraph': {
    fontSize: STYLES.FONT_SIZE.INTERMEDIUM_PARAGRAPH,
    fontFamily: STYLES.FONT_FAMILY.LATO_REGULAR,
  } as TextStyle,
});

export default styles;
