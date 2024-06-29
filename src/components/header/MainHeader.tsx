import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../utils/constants';
import {Icons} from '../icons';
import {useNavigation} from '@react-navigation/native';

type Props = {
  backButton?: boolean;
};

export const MainHeader = ({backButton = false}: Props) => {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      {backButton && (
        <TouchableOpacity
          onPress={goBack}
          style={{
            position: 'absolute',
            left: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Icons.AngleRight
            style={{transform: [{rotate: '180deg'}]}}
            width={15}
            height={15}
          />
          <Text>Atrás</Text>
        </TouchableOpacity>
      )}

      <View
        style={{
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          position: 'absolute',
          left: '50%',
          transform: [{translateX: -50}],
        }}>
        <Icons.MoneyBills
          color={COLORS.textPrimary}
          width={20}
          height={15}
          style={styles.icon}
        />
        <Text style={styles.title}>Banco</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderBottomColor: COLORS.borderBlue,
    flexDirection: 'row',
    position: 'relative',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontFamily: 'RobotoSerif-Bold',
    color: COLORS.textPrimary,
  },
  icon: {
    transform: [{rotate: '180deg'}],
  },
});
