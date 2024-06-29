import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { COLORS } from '../../utils/constants';

export type CustomButtonProps = TouchableOpacityProps & {
  textProps?: TextProps;
  text: string
};

export const CustomButton = ({textProps, text, ...rest}: CustomButtonProps) => {
  return (
    <TouchableOpacity testID='custom-button' {...rest} style={[styles.button, rest.style]}>
      <Text {...textProps} style={[styles.text, textProps?.style]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.btnPrimary,
    borderRadius: 5,
  },
  text: {
    fontFamily: "RobotoSerif-Bold",
    fontSize: 12
  },
});
