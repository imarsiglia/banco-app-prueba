import {useMutation, useQuery} from '@tanstack/react-query';
import {productEndpoints} from '../endpoints/productEndpoints';
import { ProductRequest } from '../general/fetchers';

export const useGetProducts = () => {
  return useQuery({
    queryKey: [`products`],
    queryFn: productEndpoints.getProducts,
    select({data}) {
      return data;
    },
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['createproduct'],
    mutationFn: productEndpoints.createProduct,
  });
};

export const useUpdateProduct = () => {
    return useMutation({
      mutationKey: ['updateproduct'],
      mutationFn: productEndpoints.updateProduct,
    });
  };

export const useRemoveProduct = () => {
  return useMutation({
    mutationKey: ['deleteproduct'],
    mutationFn: productEndpoints.deleteProduct,
  });
};

export const useVerifyProduct = () => {
  return useMutation({
    mutationKey: [`verifyproduct`],
    mutationFn: productEndpoints.verifyProduct,
  });
};