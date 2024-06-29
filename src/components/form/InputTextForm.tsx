import React, { useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { CustomInputText, CustomInputTextProps } from '../inputs/CustomInputText';

type Props = CustomInputTextProps & {
  currentId: string;
};

export const InputTextForm = ({currentId, ...restProps}: Props) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const translateYAnim = useState(new Animated.Value(0))[0];
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    if (errors[currentId]) {
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: 2,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -10,
          duration: 100,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          easing: Easing.ease,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [errors[currentId]]);

  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <CustomInputText
            {...restProps}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[
              restProps.style,
              errors[currentId] ? {borderColor: 'red'} : {},
            ]}
          />
        )}
        name={currentId}
      />

      <Animated.View
        style={{
          minHeight: 18,
          transform: [{translateY: translateYAnim}],
          opacity: fadeAnim,
        }}>
        <Text style={styles.errorMessage}>
          {errors[currentId]?.message?.toString()}
        </Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    color: 'red',
    fontSize: 12,
  },
});
