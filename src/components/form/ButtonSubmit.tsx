import React from 'react';
import {useFormContext} from 'react-hook-form';
import {CustomButton, CustomButtonProps} from '../buttons/CustomButton';
import {Alert} from 'react-native';

type Props = CustomButtonProps & {
  onSubmit: (data: any) => void;
};

export const ButtonSubmit = ({onSubmit, ...restProps}: Props) => {
  const {handleSubmit} = useFormContext();

  return (
    <CustomButton
      {...restProps}
      onPress={handleSubmit(onSubmit, () =>
        Alert.alert('Debe completar el formulario'),
      )}
    />
  );
};
