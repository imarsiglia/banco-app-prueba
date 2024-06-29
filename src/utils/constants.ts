export const COLORS = {
    textPrimary: "#1E3667",
    borderBlue: "#dce4f4",
    borderGray: "#E0E0E0",
    btnPrimary: "#FFDD02",
    btnSecondary: "#E9ECF3",
    btnError: "#D50808",
}

export enum ROUTES {
    Products = "Products",
    ProductDetail = "ProductDetail",
    ProductAdd = "ProductAdd",
    ProductEdit = "ProductEdit"
}

export type RootNavigationType = {
    [key in ROUTES]: undefined | { id?: string };
  };
