import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';

import { COLORS } from '../../constants/styles';
import CustomText from '../CustomText';

export interface IHyperTextProps {
  prefix?: string;
  prefixColor?: string;
  text: string;
  textColor?: string;
  testID: string;
  customStyles?: ViewStyle;
  onPress: () => void;
}

const HyperText: React.FC<IHyperTextProps> = ({
  prefix,
  prefixColor = COLORS.GRAY_MEDIUM,
  text,
  textColor = COLORS.OPYA_BLUE,
  testID,
  customStyles,
  onPress,
}) => (
  <TouchableOpacity onPress={onPress} testID={testID} style={customStyles}>
    <Text>
      {prefix && <CustomText color={prefixColor} text={`${prefix} `} />}
      <CustomText color={textColor} text={text} bodyType="paragraph-bold" />
    </Text>
  </TouchableOpacity>
);

export default HyperText;
