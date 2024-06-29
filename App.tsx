import React from 'react';
import {RootNavigation} from './src/navigation/RootNavigation';
import {SafeAreaView, StyleSheet} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import ProductProvider from './src/context/products/ProductProvider';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <SafeAreaView style={styles.container}>
          <RootNavigation />
        </SafeAreaView>
      </ProductProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
