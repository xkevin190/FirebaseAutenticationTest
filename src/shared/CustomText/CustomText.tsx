import React from 'react';
import {Text, TextStyle} from 'react-native';

import {COLORS} from '../../constants/styles';
import {TextBody} from '../../types/CustomText';
import styles from './CustomText.style';

export interface ICustomTextProps {
  text: string;
  center?: boolean;
  color?: string;
  bodyType?: TextBody;
  testID?: string;
  customStyle?: TextStyle;
}

const CustomText: React.FC<ICustomTextProps> = ({
  text,
  color = COLORS.BLACK,
  bodyType = 'paragraph',
  center = false,
  testID = '',
  customStyle = {},
}) => (
  <Text
    style={{
      ...styles[bodyType],
      ...customStyle,
      ...(center && {textAlign: 'center'}),
      color,
    }}
    testID={testID}>
    {text}
  </Text>
);

export default CustomText;
