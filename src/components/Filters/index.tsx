import React from "react";

import { Product } from "../../interfaces";

interface FiltersProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Filters: React.FC<FiltersProps> = ({ products, setProducts }) => {
  const handleFilterByColor = (color: string) => {
    if (color === "All") {
      setProducts(products);
    } else {
      const filteredProducts = products.filter(
        product => product.colour === color
      );
      setProducts(filteredProducts);
    }
  };

  const allColors = ["All", "Black", "Stone", "Red"];

  return (
    <div className="p-2">
      <label htmlFor="color-filter" className="font-bold text-lg mb-2 block">
        Filter by color:
      </label>
      <select
        id="color-filter"
        data-testid="color-filter"
        className="bg-white border border-gray-400 rounded py-2 px-4 mb-4"
        onChange={e => handleFilterByColor(e.target.value)}
      >
        {allColors.map(color => (
          <option key={color} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
