import { StyleSheet, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  modalHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 25,
    paddingHorizontal: 25,
  } as ViewStyle,
  closeButtonContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
  } as ViewStyle,
});

export default styles;
