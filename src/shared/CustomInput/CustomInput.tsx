import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import CustomText from '../CustomText';
import { COLORS } from '../../constants/styles';
import styles from './CustomInput.styles';

export interface ICustomInputProps {
  title?: string;
  validationsText?: string[];
  placeholder: string;
  value: string;
  height?: number;
  textArea?: boolean;
  pattern?: RegExp[];
  required?: boolean;
  password?: boolean;
  icon?: React.ReactNode;
  onChangeText: (text: string) => void;
}

const CustomInput: React.FC<ICustomInputProps> = ({
  title = '',
  placeholder,
  value,
  validationsText = [],
  height,
  textArea = false,
  pattern,
  required = false,
  password = false,
  icon = null,
  onChangeText,
}) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);
  const isRequiredEnabled = required && !value;
  const isValidationEnabled = hasError && !!value;
  const isErrorEnabled = isRequiredEnabled || isValidationEnabled;
  const handleValidation = (valueToValidate: string): boolean => {
    if (!pattern || !validationsText.length) {
      return false;
    }
    const conditions = pattern.map(rule => new RegExp(rule, 'g'));
    return !conditions.every(condition => condition.test(valueToValidate));
  };
  const handleOnChange = (newValue: string) => {
    setHasError(handleValidation(newValue));
    onChangeText(newValue);
  };

  return (
    <>
      {title ? (
        <CustomText
          text={title.toUpperCase()}
          color={isErrorEnabled ? COLORS.ALERT_DEFAULT : COLORS.GRAY_MEDIUM}
          bodyType="small-paragraph-bold"
        />
      ) : null}
      <View
        style={{
          ...styles.inputContainer,
          borderColor: isErrorEnabled
            ? COLORS.ALERT_DEFAULT
            : COLORS.GRAY_MEDIUM,
          ...(!!height && { height }),
        }}
      >
        <TextInput
          placeholder={placeholder}
          style={{
            ...styles.input,
            ...(!!height && { height }),
            color: isErrorEnabled ? COLORS.ALERT_DEFAULT : COLORS.BLACK,
          }}
          placeholderTextColor={
            isErrorEnabled ? COLORS.ALERT_DEFAULT : COLORS.GRAY_MEDIUM
          }
          autoCorrect={false}
          value={value}
          onChangeText={handleOnChange}
          multiline={textArea}
          numberOfLines={textArea ? 10 : 1}
          textAlignVertical={textArea ? 'top' : 'auto'}
          secureTextEntry={password}
          autoCapitalize="none"
        />
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
      {isRequiredEnabled || isValidationEnabled ? (
        <View style={styles.errorContainer}>
          {isRequiredEnabled ? (
            <CustomText
              text={`- ${t('general:translation.requiredField')}`}
              color={COLORS.ALERT_DEFAULT}
              bodyType="small-paragraph"
            />
          ) : null}
          {isValidationEnabled
            ? validationsText.map(validation => (
                <CustomText
                  key={validation}
                  text={`- ${validation}`}
                  color={COLORS.ALERT_DEFAULT}
                  bodyType="small-paragraph"
                />
              ))
            : null}
        </View>
      ) : null}
    </>
  );
};

export default CustomInput;
