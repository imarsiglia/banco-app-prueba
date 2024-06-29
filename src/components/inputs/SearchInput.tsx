import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewProps,
} from 'react-native';
import {COLORS} from '../../utils/constants';

type Props = TextInputProps & {
  containerProps?: ViewProps;
};

export const SearchInput = ({
  containerProps,
  placeholder = 'Buscar...',
  autoCorrect = false,
  autoCapitalize = 'none',
  ...restProps
}: Props) => {
  return (
    <View {...containerProps} style={[styles.container, containerProps?.style]}>
      <TextInput
        autoCorrect={autoCorrect}
        autoCapitalize={autoCapitalize}
        {...restProps}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: 5,
  },
});
