import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {useFormContext} from 'react-hook-form';
import {StyleSheet, Text, View} from 'react-native';
import {useUpdateProduct} from '../../api/hooks/HooksProduct';
import {CustomButton} from '../../components/buttons/CustomButton';
import {BasicFormProvider} from '../../components/form/BasicFormProvider';
import {ButtonSubmit} from '../../components/form/ButtonSubmit';
import {MainHeader} from '../../components/header/MainHeader';
import {useProductContext} from '../../context/products/ProductContext';
import {globalStyles} from '../../styles/globalStyles';
import {COLORS} from '../../utils/constants';
import {formatDate} from '../../utils/functions';
import {ProductSchema, ProductSchemaType} from '../../utils/schemas';
import {FormProduct} from './FormProduct';

export const ProductEdit = () => {
  const {selectedItem} = useProductContext();

  return (
    <View style={globalStyles.container}>
      <MainHeader backButton />

      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Edición</Text>
        <BasicFormProvider schema={ProductSchema} defaultValue={selectedItem}>
          <FormEdit />
        </BasicFormProvider>
      </View>
    </View>
  );
};

const FormEdit = () => {
  const queryClient = useQueryClient();
  const {goBack} = useNavigation();
  const {mutate: updateProduct, isPending} = useUpdateProduct();
  const {reset} = useFormContext();
  const {setSelectedItem} = useProductContext();

  function resetFields() {
    reset();
  }

  function onEdit(itemData: ProductSchemaType) {
    const body = {
      ...itemData,
      date_release: formatDate(itemData.date_release),
      date_revision: formatDate(itemData.date_revision),
    };

    updateProduct(body, {
      onSuccess: ({data}) => {
        if (!data.HasError) {
          queryClient.invalidateQueries({queryKey: ['products']});
          setSelectedItem(itemData);
          goBack();
        }
      },
    });
  }

  return (
    <>
      <FormProduct isEditing />
      <View style={{gap: 10}}>
        <ButtonSubmit text="Enviar" onSubmit={onEdit} disabled={isPending} />
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
