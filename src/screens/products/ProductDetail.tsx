import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';
import {useRemoveProduct} from '../../api/hooks/HooksProduct';
import {BottomSheet} from '../../components/bottomSheet/BottomSheet';
import {CustomButton} from '../../components/buttons/CustomButton';
import {MainHeader} from '../../components/header/MainHeader';
import {useProductContext} from '../../context/products/ProductContext';
import {globalStyles} from '../../styles/globalStyles';
import {COLORS, ROUTES, RootNavigationType} from '../../utils/constants';
import {formatDate} from '../../utils/functions';
import ImageWithSkeleton from '../../components/images/ImageWithSkeleton';

type ScrollViewRef = ScrollView & {
  flashScrollIndicators: () => void;
};

export const ProductDetail = () => {
  const {selectedItem} = useProductContext();
  const {navigate, goBack} =
    useNavigation<NavigationProp<RootNavigationType>>();
  const queryClient = useQueryClient();
  const {mutate} = useRemoveProduct();
  const scrollViewRef = React.useRef<ScrollViewRef | null>(null);
  const isOpen = useSharedValue(false);

  useEffect(() => {
    setTimeout(function () {
      scrollViewRef.current?.flashScrollIndicators();
    }, 500);
  }, []);

  function toggleSheet() {
    isOpen.value = !isOpen.value;
  }

  function onInitEdit() {
    navigate(ROUTES.ProductEdit);
  }

  function removeProduct() {
    if (selectedItem?.id) {
      mutate(selectedItem.id, {
        onSuccess: ({data}) => {
          if (!data.HasError) {
            queryClient.invalidateQueries({queryKey: ['products']});
            goBack();
          }
        },
      });
    }
  }

  if (!selectedItem) {
    return <></>;
  }

  return (
    <View style={globalStyles.container}>
      <MainHeader backButton />

      <View style={styles.container}>
        <View style={{paddingHorizontal: 5}}>
          <Text style={styles.title}>ID: {selectedItem.id}</Text>
          <Text style={styles.subtitle}>Información extra</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <Text style={styles.name}>Nombre</Text>
            <Text style={styles.value}>{selectedItem.name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.name}>Descripción</Text>
            <Text style={styles.value}>{selectedItem.description}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.name}>Logo</Text>
            <ImageWithSkeleton
              uri={selectedItem.logo}
              width={200}
              height={100}
              containerProps={{style: styles.image}}
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.name}>Fecha liberación</Text>
            <Text style={styles.value}>
              {formatDate(selectedItem.date_release)}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.name}>Fecha revisión</Text>
            <Text style={styles.value}>
              {formatDate(selectedItem.date_revision)}
            </Text>
          </View>
        </View>

        <View style={{gap: 10}}>
          <CustomButton
            text="Editar"
            style={{backgroundColor: COLORS.btnSecondary}}
            onPress={onInitEdit}
          />
          <CustomButton
            text="Eliminar"
            style={{backgroundColor: COLORS.btnError}}
            textProps={{style: {color: 'white'}}}
            onPress={toggleSheet}
          />
        </View>
      </View>

      <BottomSheet isOpen={isOpen} toggleSheet={toggleSheet} height={270}>
        <View
          style={{
            backgroundColor: 'white',
            flex: 1,
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <ScrollView
            ref={scrollViewRef}
            persistentScrollbar
            contentContainerStyle={{
              gap: 30,
              paddingRight: 14,
              paddingVertical: 10,
            }}
            style={{paddingHorizontal: 20, maxHeight: 80}}
            showsVerticalScrollIndicator={false}>
            <Text
              style={{
                fontWeight: 500,
                textAlign: 'center',
              }}>{`¿Estás seguro de eliminar el producto ${selectedItem.name}`}</Text>

            <Text style={{textAlign: 'center', color: '#1A1A1A'}}>
              Ten cuenta que no podrás recuperar el producto en el futuro
            </Text>
          </ScrollView>

          <View
            style={{
              gap: 10,
              borderTopWidth: 1,
              borderTopColor: COLORS.borderGray,
              paddingTop: 20,
            }}>
            <CustomButton text="Confirmar" onPress={removeProduct} />
            <CustomButton
              text="Cancelar"
              style={{backgroundColor: COLORS.btnSecondary}}
              textProps={{style: {color: COLORS.textPrimary}}}
              onPress={toggleSheet}
            />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    flex: 1,
    gap: 20,
  },
  title: {
    fontFamily: 'RobotoSerif-Regular',
    fontSize: 22,
    fontWeight: '600',
  },
  subtitle: {
    color: 'gray',
  },
  content: {
    flex: 1,
    gap: 20,
    marginTop: 30,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '500',
    color: 'gray',
    fontFamily: 'RobotoSerif-Regular',
  },
  value: {
    fontWeight: '600',
    fontFamily: 'RobotoSerif-Regular',
  },
  image: {
    borderRadius: 4, 
    overflow: 'hidden'
  }
});
