import React from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextProps,
  View,
  ViewProps,
} from 'react-native';
import {COLORS} from '../../utils/constants';

export type CustomInputTextProps = TextInputProps & {
  containerProps?: ViewProps;
  labelProps?: TextProps;
  label?: string;
};

export const CustomInputText = ({
  containerProps,
  labelProps,
  label,
  autoCorrect = false,
  autoCapitalize = 'none',
  ...rest
}: CustomInputTextProps) => {
  return (
    <View {...containerProps} style={[styles.container, containerProps?.style]}>
      {label && <Text {...labelProps}>{label}</Text>}
      <TextInput
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        {...rest}
        style={[
          rest.editable == false ? styles.disabled : {},
          styles.input,
          rest.style,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 7,
  },
  input: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: 5,
  },
  disabled: {
    backgroundColor: '#EDEDED',
  },
});
