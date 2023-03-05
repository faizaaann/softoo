import { useState } from "react";

import { ProductCardProps } from "@/interfaces";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToBasket,
  onRemoveFromBasket,
}) => {
  const [quantity, setQuantity] = useState<number>(0);

  const handleIncreaseQuantity = () => {
    setQuantity(prevQty => prevQty + 1);
    onAddToBasket(product.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQty => prevQty - 1);
      onAddToBasket(product.id, quantity - 1);
    } else {
      handleRemove();
    }
  };

  const handleRemove = () => {
    setQuantity(0);
    onRemoveFromBasket(product.id);
  };

  return (
    <div className="py-4 flex items-center">
      <img src={product.img} alt={product.name} className="w-48 mr-4" />
      <div className="flex flex-grow">
        <div className="w-[50%]">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-gray-600 text-right">
            £{product.price.toFixed(2)}
          </p>
        </div>
        <div className="w-[50%]">
          <div className="flex justify-end items-center mt-4 space-x-4">
            <div className="flex justify-center items-center space-x-4">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={handleDecreaseQuantity}
              >
                -
              </button>
              <div>
                <p className="w-12 text-center">{quantity}</p>
                <button
                  className={`text-[12px] ${
                    quantity > 0 ? "text-black" : "text-gray-500"
                  }`}
                  disabled={quantity <= 0}
                  onClick={handleRemove}
                >
                  Remove
                </button>
              </div>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={handleIncreaseQuantity}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
