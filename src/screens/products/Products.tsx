import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ProductRequest} from '../../api/general/fetchers';
import {useGetProducts} from '../../api/hooks/HooksProduct';
import {CustomButton} from '../../components/buttons/CustomButton';
import {MainHeader} from '../../components/header/MainHeader';
import {Icons} from '../../components/icons';
import {SearchInput} from '../../components/inputs/SearchInput';
import {useProductContext} from '../../context/products/ProductContext';
import {useDebounce} from '../../hooks/useDebounce';
import {globalStyles} from '../../styles/globalStyles';
import {COLORS, ROUTES, RootNavigationType} from '../../utils/constants';

export const Products = () => {
  const {navigate} = useNavigation<NavigationProp<RootNavigationType>>();
  const {data} = useGetProducts();
  const [filter, setFilter] = useState('');
  const filterValue = useDebounce(filter, 100);

  const filteredList: ProductRequest[] = useMemo(() => {
    if (!data?.data) return [];
    if (filterValue.trim().length == 0) {
      return data.data;
    }
    return data.data.filter(
      (x: ProductRequest) =>
        x.id.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
        x.name.toLowerCase().includes(filterValue.trim().toLowerCase()),
    );
  }, [filterValue, data]);

  function onInitAdd() {
    navigate(ROUTES.ProductAdd);
  }

  return (
    <View style={globalStyles.container}>
      <MainHeader />
      <View style={styles.container}>
        <SearchInput value={filter} onChangeText={setFilter} />
        <ProductList data={filteredList} />
        <CustomButton
          text="Agregar"
          onPress={onInitAdd}
          style={{marginTop: 10}}
        />
      </View>
    </View>
  );
};

const ProductList = ({data}: {data: ProductRequest[]}) => {
  const {navigate} = useNavigation<NavigationProp<RootNavigationType>>();
  const {setSelectedItem} = useProductContext();

  function onSelect(item: ProductRequest) {
    setSelectedItem({
      ...item,
      date_release: new Date(item.date_release),
      date_revision: new Date(item.date_revision),
    });
    navigate(ROUTES.ProductDetail);
  }

  if (!data || data.length == 0) {
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'RobotoSerif-Regular',
            fontSize: 16,
          }}>
          No existen productos
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      style={styles.containerList}
      contentContainerStyle={styles.contentScroll}
      ItemSeparatorComponent={ItemSeparator}
      data={data}
      renderItem={({index, item}) => (
        <TouchableOpacity
          key={index}
          onPress={() => onSelect(item)}
          style={styles.containerProduct}>
          <View style={{gap: 5}}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productId}>ID: {item.id}</Text>
          </View>
          <Icons.AngleRight width={20} height={20} color={'#A8A8A8'} />
        </TouchableOpacity>
      )}
    />
  );
};

const ItemSeparator = () => {
  return <View style={{height: 2, backgroundColor: COLORS.borderBlue}} />;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 40,
    paddingBottom: 30,
    flex: 1,
    justifyContent: 'space-between',
  },
  containerList: {
    marginTop: 40,
  },
  contentScroll: {
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 2,
    borderColor: COLORS.borderBlue,
  },
  containerProduct: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
  },
  productName: {
    fontWeight: '600',
  },
  productId: {
    fontWeight: '600',
    fontSize: 12,
    color: 'gray',
  },
});
