import { render, screen } from "@testing-library/react";

import { ProductListProps } from "@/interfaces";

import ProductList from "./index";

const mockProducts: ProductListProps = {
  products: [
    {
      id: 1,
      name: "Test Product 1",
      img: "http://example.com/test1.png",
      price: 20,
      colour: "Black",
    },
    {
      id: 2,
      name: "Test Product 2",
      img: "http://example.com/test2.png",
      price: 30,
      colour: "White",
    },
    {
      id: 3,
      name: "Test Product 3",
      img: "http://example.com/test3.png",
      price: 40,
      colour: "Red",
    },
  ],
  onAddToBasket: jest.fn(),
  onRemoveFromBasket: jest.fn(),
};

describe("ProductList", () => {
  it("renders all products correctly", () => {
    render(<ProductList {...mockProducts} />);
    const productNames = screen.getAllByText(/Test Product/);
    expect(productNames).toHaveLength(mockProducts.products.length);
    const productPrices = screen.getAllByText(/£/);
    expect(productPrices).toHaveLength(mockProducts.products.length);
    const productImgs = screen.getAllByAltText(/Test Product/);
    expect(productImgs).toHaveLength(mockProducts.products.length);
  });
});
