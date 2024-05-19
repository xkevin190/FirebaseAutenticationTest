import React from 'react';
import {StyleProp, TextInput, View, ViewStyle} from 'react-native';

import CustomText from '../CustomText';
import {COLORS} from '../../constants/styles';
import styles from './CustomInput.styles';

export interface FormInputProps {
  iconPosition?: 'start' | 'end';
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: ViewStyle;
  onPress?: () => void;
  title?: string;
  placeholder: string;
  value: string;
  height?: number;
  textArea?: boolean;
  required?: boolean;
  password?: boolean;
  icon?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  helperText?: string;
  onFocus?: (e: any) => void;
  onBlur?: (e: any) => void;
  onchangeText?: (text: string) => void;
}

const CustomInput: React.FC<FormInputProps> = ({
  title = '',
  placeholder,
  value,
  height,
  textArea = false,
  required = false,
  password = false,
  onFocus,
  onBlur,
  icon = null,
  helperText,
  onchangeText,
  error,
  ...rest
}) => {
  return (
    <>
      {title ? (
        <CustomText
          text={title.toUpperCase()}
          color={error ? COLORS.ALERT_DEFAULT : COLORS.GRAY_MEDIUM}
          bodyType="small-paragraph-bold"
        />
      ) : null}
      <View
        style={{
          ...styles.inputContainer,
          borderColor: error ? COLORS.ALERT_DEFAULT : COLORS.GRAY_MEDIUM,
          ...(!!height && {height}),
        }}>
        <TextInput
          placeholder={placeholder}
          style={{
            ...styles.input,
            ...(!!height && {height}),
            color: error ? COLORS.ALERT_DEFAULT : COLORS.BLACK,
          }}
          placeholderTextColor={
            error ? COLORS.ALERT_DEFAULT : COLORS.GRAY_MEDIUM
          }
          onFocus={e => {
            onFocus?.(e);
          }}
          onBlur={e => {
            onBlur?.(e);
          }}
          autoCorrect={false}
          value={value}
          multiline={textArea}
          numberOfLines={textArea ? 10 : 1}
          textAlignVertical={textArea ? 'top' : 'auto'}
          secureTextEntry={password}
          autoCapitalize="none"
          onChangeText={onchangeText}
          {...rest}
        />
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
      {helperText && (
        <View style={styles.errorContainer}>
          <CustomText
            testID="helperText"
            text={helperText}
            color={COLORS.ALERT_DEFAULT}
            bodyType="small-paragraph"
          />
        </View>
      )}
    </>
  );
};

export default CustomInput;
