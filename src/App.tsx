import axios from "axios";
import { useEffect, useState } from "react";

import Basket from "./components/Basket";
import Filters from "./components/Filters";
import ProductList from "./components/ProductList";
import { BasketItem, Product } from "./interfaces";

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [basket, setBasket] = useState<BasketItem[]>([]);

  useEffect(() => {
    axios
      .get<Product[]>(
        "https://my-json-server.typicode.com/benirvingplt/products/products"
      )
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleRemoveFromBasket = (productId: number) => {
    setBasket(prevBasket => prevBasket.filter(item => item.id !== productId));
  };

  const handleAddToBasket = (productId: number, quantity: number) => {
    const itemIndex = basket.findIndex(item => item.id === productId);

    if (itemIndex >= 0) {
      const newBasket = [...basket];
      newBasket[itemIndex].quantity = quantity;
      setBasket(newBasket);
    } else {
      const productToAdd = products.find(product => product.id === productId);
      if (productToAdd) {
        setBasket(prevBasket => [...prevBasket, { ...productToAdd, quantity }]);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className="p-4 border-b-2">
        <Filters products={products} setProducts={setFilteredProducts} />
      </div>
      <div className="flex-1 flex flex-row">
        <div className="w-3/4 p-4">
          <ProductList
            products={filteredProducts}
            onAddToBasket={handleAddToBasket}
            onRemoveFromBasket={handleRemoveFromBasket}
          />
        </div>
        <div className="w-1/4 p-4">
          <Basket
            items={basket}
            total={basket.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
