import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '../../utils/constants';
import { Icons } from '../icons';

type PropsType = {
  isOpen: SharedValue<boolean>;
  toggleSheet: () => void;
  duration?: number;
  children: React.ReactNode;
  height?: number;
  closable?: boolean;
};

export const BottomSheet = ({
  isOpen,
  toggleSheet,
  duration = 500,
  children,
  height = 150,
  closable = true,
}: PropsType) => {
  const animatedHeight = useSharedValue(0);
  const progress = useDerivedValue(() =>
    withTiming(isOpen.value ? 0 : 1, {duration}),
  );

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{translateY: progress.value * 2 * animatedHeight.value}],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
    zIndex: isOpen.value
      ? 1
      : withDelay(duration, withTiming(-1, {duration: 0})),
  }));

  return (
    <>
      <Animated.View style={[sheetStyles.backdrop, backdropStyle]}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={closable ? toggleSheet : undefined}
        />
      </Animated.View>
      <Animated.View
        onLayout={e => {
          animatedHeight.value = e.nativeEvent.layout.height;
        }}
        style={[sheetStyles.sheet, {height}, sheetStyle]}>
        {closable && (
          <View
            style={{
              height: 50,
              paddingHorizontal: 20,
              borderBottomWidth: 1,
              borderBottomColor: COLORS.borderGray,
              width: '100%',
              backgroundColor: 'white',
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            <TouchableOpacity onPress={toggleSheet}>
              <Icons.Close width={20} height={20} color={'gray'} />
            </TouchableOpacity>
          </View>
        )}

        {children}
      </Animated.View>
    </>
  );
};

const sheetStyles = StyleSheet.create({
  sheet: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
});
