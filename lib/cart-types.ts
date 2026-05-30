export type CartLine = {
  id: string;
  name: string;
  price: number;
  img: string;
  category: string;
  quantity: number;
};

export const CART_STORAGE_KEY = "elemen-india-cart";
