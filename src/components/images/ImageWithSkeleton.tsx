import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ViewProps, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {COLORS} from '../../utils/constants';

interface ImageWithSkeletonProps {
  uri: string;
  width: number;
  height: number;
  containerProps?: ViewProps;
}

const ImageWithSkeleton: React.FC<ImageWithSkeletonProps> = ({
  uri,
  width,
  height,
  containerProps,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
    }
  }, [uri]);

  return (
    <View testID="image-container" {...containerProps} style={[{width, height}, containerProps?.style]}>
      {isLoading && (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item
            width={width}
            height={height}
            borderRadius={4}
          />
        </SkeletonPlaceholder>
      )}
      <FastImage
        testID="loaded-image"
        style={[
          styles.image,
          {width, height},
          isLoading ? {display: 'none'} : {},
        ]}
        source={{uri}}
        onLoad={() => {
          setIsError(false);
          setIsLoading(false);
        }}
        onError={() => {
          setIsLoading(false);
          setIsError(true);
        }}
      />

      {!isLoading && isError && (
        <View
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: COLORS.borderGray,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          testID="error-message">
          <Text style={{fontFamily: 'RobotoSerif-Regular'}}>
            Imagen no válida
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ImageWithSkeleton;
