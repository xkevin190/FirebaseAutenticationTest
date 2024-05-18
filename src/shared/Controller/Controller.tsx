import React, {ComponentType} from 'react';
import {
  Control,
  FieldValues,
  RegisterOptions,
  useController,
} from 'react-hook-form';

interface RHFInputProps {
  name: string;
  control: Control<any>;
  rules?: Pick<
    RegisterOptions<FieldValues>,
    'maxLength' | 'minLength' | 'validate' | 'required' | 'pattern'
  >;
}

export const withController =
  <P,>(WrappedComponent: ComponentType<P>) =>
  (props: RHFInputProps & P) => {
    const {control, rules, name} = props;

    const {field, fieldState} = useController({
      control,
      name,
      rules,
    });

    return (
      <WrappedComponent
        {...props}
        error={fieldState.invalid}
        value={field.value}
        onBlur={field.onBlur}
        onChangeText={field.onChange}
        helperText={fieldState.error?.message}
      />
    );
  };

export default withController;
