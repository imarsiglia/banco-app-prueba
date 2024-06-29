import { API_CREATE_PRODUCT, API_DELETE_PRODUCT, API_GET_PRODUCTS, API_UPDATE_PRODUCT, API_VERIFY_PRODUCT } from "../contants/endpoints";
import { ProductRequest, deleteFetcher, getFetcher, postFetcher, putFetcher } from "../general/fetchers";
  
  export const productEndpoints = {
    getProducts: () =>
      getFetcher(API_GET_PRODUCTS), //consultar productos
    createProduct: (data: ProductRequest) => {
      return postFetcher(API_CREATE_PRODUCT, data); // crear nuevo producto
    },
    updateProduct: (data: ProductRequest) => {
      return putFetcher(`${API_UPDATE_PRODUCT}/${data.id}`, data); // actualizar producto
    },
    deleteProduct: (id: string) =>
      deleteFetcher(`${API_DELETE_PRODUCT}/${id}`), // eliminar producto
    verifyProduct: (id: string) =>
      getFetcher(`${API_VERIFY_PRODUCT}/${id}`), // verificar si existe el producto
  };
  