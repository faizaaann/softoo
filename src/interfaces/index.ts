export interface Product {
  id: number;
  colour: string;
  name: string;
  price: number;
  img: string;
}

export interface ProductListProps {
  products: Product[];
  onAddToBasket: (productId: number, quantity: number) => void;
  onRemoveFromBasket: (productId: number) => void;
}

export interface ProductCardProps {
  product: Product;
  onAddToBasket: (productId: number, quantity: number) => void;
  onRemoveFromBasket: (productId: number) => void;
}

export interface BasketProps {
  items: BasketItem[];
  total: number;
}

export interface FiltersProps {
  products: Product[];
  updateFilteredProducts: (filteredProducts: Product[]) => void;
}

export interface BasketItem {
  id: number;
  name: string;
  img: string;
  price: number;
  quantity: number;
  colour?: string;
}
