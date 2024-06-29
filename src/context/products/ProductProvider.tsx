import { ReactNode, useState } from "react";
import ProductContext, { ProductContextType } from "./ProductContext";

type props = {
    children: ReactNode | undefined;
    value?: ProductContextType
}

const ProductProvider = ({children, value}: props) => {
    const [selectedItem, setSelectedItem] = useState(value?.selectedItem)

    const contextValue = {
        ...value,
        selectedItem,
        setSelectedItem
      }
    return <ProductContext.Provider value={contextValue}>{children}</ProductContext.Provider>
}

export default ProductProvider;