import React, { useContext } from "react";
import { Product } from "../../utils/types";

export type ProductContextType = {
  selectedItem?: Product;
  setSelectedItem: (item?: Product) => void
};

const defaultContext: ProductContextType = {
    selectedItem: undefined,
    setSelectedItem: () => {}
};

const ProductContext = React.createContext<ProductContextType>(defaultContext);

const useProductContext = () => useContext(ProductContext);

export { useProductContext };

export default ProductContext;
