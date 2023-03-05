import { ProductListProps } from "@/interfaces";

import ProductCard from "../ProductCard";

const ProductList: React.FC<ProductListProps> = ({
  products,
  onAddToBasket,
  onRemoveFromBasket,
}) => {
  return (
    <div className="py-8 px-2">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToBasket={onAddToBasket}
          onRemoveFromBasket={onRemoveFromBasket}
        />
      ))}
    </div>
  );
};

export default ProductList;
