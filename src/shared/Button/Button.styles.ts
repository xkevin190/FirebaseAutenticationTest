import {StyleSheet, ViewStyle} from 'react-native';

const basicContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  borderRadius: 25,
};

const styles = StyleSheet.create({
  md: {
    ...basicContainer,
    width: '45%',
  } as ViewStyle,
  xxl: {
    ...basicContainer,
    width: '100%',
  } as ViewStyle,
});

export default styles;
