import React, {useEffect, useState} from 'react';
import {Controller, useFormContext} from 'react-hook-form';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomInputTextProps} from '../inputs/CustomInputText';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {COLORS} from '../../utils/constants';
import {formatDate} from '../../utils/functions';

type Props = CustomInputTextProps & {
  currentId: string;
  onChangeValue?: (date: Date) => void;
};

export const InputDateForm = ({
  currentId,
  label,
  labelProps,
  containerProps,
  onChangeValue,
  editable = true,
  ...restProps
}: Props) => {
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const [dateVisible, setDateVisible] = useState(false);

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
        }),
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
        }),
      ]).start();
    }
  }, [errors[currentId]]);

  function closePicker() {
    setDateVisible(false);
  }

  function openPicker() {
    setDateVisible(true);
  }

  return (
    <View>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <>
            <View
              {...containerProps}
              style={[styles.container, containerProps?.style]}>
              {label && <Text {...labelProps}>{label}</Text>}
            </View>

            <TouchableOpacity
              disabled={!editable}
              onPress={openPicker}>
              <View
                {...restProps}
                style={[
                  editable == false ? styles.disabled : {},
                  styles.input,
                  restProps.style,
                  errors[currentId] ? {borderColor: 'red'} : {},
                ]}>
                <Text>{value && formatDate(value)}</Text>
              </View>
            </TouchableOpacity>
            <DateTimePickerModal
              date={value}
              isVisible={dateVisible}
              mode="date"
              onConfirm={value => {
                onChange(value);
                closePicker();
                if (onChangeValue) {
                  onChangeValue(value);
                }
              }}
              onCancel={closePicker}
            />
          </>
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
