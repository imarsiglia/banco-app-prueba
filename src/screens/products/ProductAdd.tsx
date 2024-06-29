import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useCreateProduct, useVerifyProduct} from '../../api/hooks/HooksProduct';
import {BasicFormProvider} from '../../components/form/BasicFormProvider';
import {MainHeader} from '../../components/header/MainHeader';
import {globalStyles} from '../../styles/globalStyles';
import {formatDate} from '../../utils/functions';
import {ProductSchema, ProductSchemaType} from '../../utils/schemas';
import {FormProduct} from './FormProduct';
import {useFormContext} from 'react-hook-form';
import {ButtonSubmit} from '../../components/form/ButtonSubmit';
import {CustomButton} from '../../components/buttons/CustomButton';
import {COLORS} from '../../utils/constants';

export const ProductAdd = () => {
  return (
    <View style={globalStyles.container}>
      <MainHeader backButton />

      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Registro</Text>
        <BasicFormProvider schema={ProductSchema}>
          <FormAdd />
        </BasicFormProvider>
      </View>
    </View>
  );
};

const FormAdd = () => {
  const queryClient = useQueryClient();
  const {goBack} = useNavigation();
  const {mutate: createProduct, isPending} = useCreateProduct();
  const {mutate: verifyProduct} = useVerifyProduct();
  const {setError, reset} = useFormContext();

  function resetFields() {
    reset();
  }

  function onAdd(data: ProductSchemaType) {
    const body = {
      ...data,
      date_release: formatDate(data.date_release),
      date_revision: formatDate(data.date_revision),
    };

    verifyProduct(data.id, {
      onSuccess: ({data: resData}) => {
        if (!resData) {
          createProduct(body, {
            onSuccess: async ({data: dataRes}) => {
              if (!dataRes.HasError) {
                queryClient.invalidateQueries({queryKey: ['products']});
                goBack();
              }
            },
          });
        } else {
          setError('id', {message: 'ID no válido', type: 'validate'});
          Alert.alert(`El producto con ID ${data.id} ya existe`);
        }
      },
    });
  }
  return (
    <>
      <FormProduct />
      <View style={{gap: 10}}>
        <ButtonSubmit text="Enviar" onSubmit={onAdd} disabled={isPending} />
        <CustomButton
          onPress={resetFields}
          disabled={isPending}
          text="Reiniciar"
          style={{backgroundColor: COLORS.btnSecondary}}
          textProps={{style: {color: COLORS.textPrimary}}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 30,
    flex: 1,
    gap: 20,
  },
  title: {
    fontSize: 26,
    fontFamily: 'RobotoSerif-SemiBold',
  },
});
