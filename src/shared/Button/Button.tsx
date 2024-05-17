import React from 'react';
import { TouchableOpacity } from 'react-native';

import { ButtonSize } from '../../types/styles';
import CustomText from '../CustomText';
import styles from './Button.styles';
import { COLORS } from '../../constants/styles';

export interface IButtonProps {
  buttonText: string;
  testID: string;
  size?: ButtonSize;
  rounded?: boolean;
  color?: string;
  textColor?: string;
  disabled?: boolean;
  onPress: () => void;
}

const Button: React.FC<IButtonProps> = ({
  buttonText,
  testID,
  size = 'md',
  onPress,
  color = COLORS.OPYA_BLUE,
  rounded = false,
  textColor = undefined,
  disabled = false,
}) => (
  <TouchableOpacity
    style={{
      ...styles[size],
      backgroundColor: disabled ? COLORS.DISABLED_DEFAULT : color,
      ...(!rounded && { borderRadius: 0 }),
    }}
    onPress={onPress}
    testID={testID}
    disabled={disabled}
  >
    <CustomText text={buttonText} color={disabled ? COLORS.BLACK : textColor} />
  </TouchableOpacity>
);

export default Button;
