import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Products} from '../screens/products/Products';
import {ProductDetail} from '../screens/products/ProductDetail';
import {ProductAdd} from '../screens/products/ProductAdd';
import {ProductEdit} from '../screens/products/ProductEdit';
import {ROUTES} from '../utils/constants';

const Stack = createNativeStackNavigator();

export const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTES.Products}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROUTES.Products} component={Products} />
        <Stack.Screen name={ROUTES.ProductDetail} component={ProductDetail} />
        <Stack.Screen name={ROUTES.ProductAdd} component={ProductAdd} />
        <Stack.Screen name={ROUTES.ProductEdit} component={ProductEdit} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
