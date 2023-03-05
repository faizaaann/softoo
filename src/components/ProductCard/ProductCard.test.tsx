import { fireEvent, render, screen } from "@testing-library/react";

import { ProductCardProps } from "@/interfaces";

import ProductCard from "./index";

const mockProduct: ProductCardProps = {
  product: {
    id: 1,
    name: "Test Product",
    img: "http://example.com/test.png",
    price: 20,
    colour: "Black",
  },
  onAddToBasket: jest.fn(),
  onRemoveFromBasket: jest.fn(),
};

describe("ProductCard", () => {
  describe("rendering", () => {
    it("renders product information correctly", () => {
      render(<ProductCard {...mockProduct} />);
      const productName = screen.getByText(mockProduct.product.name);
      expect(productName).toBeInTheDocument();
      const productPrice = screen.getByText(
        `£${mockProduct.product.price.toFixed(2)}`
      );
      expect(productPrice).toBeInTheDocument();
      const productImg = screen.getByAltText(mockProduct.product.name);
      expect(productImg).toHaveAttribute("src", mockProduct.product.img);
    });
  });

  describe("methods", () => {
    it("adds to basket when '+' button is clicked", () => {
      render(<ProductCard {...mockProduct} />);
      const increaseButton = screen.getByText("+");
      fireEvent.click(increaseButton);
      expect(mockProduct.onAddToBasket).toHaveBeenCalledWith(
        mockProduct.product.id,
        1
      );
    });

    it("removes from basket when '-' button is clicked and quantity > 0", () => {
      render(<ProductCard {...mockProduct} />);
      const increaseButton = screen.getByText("+");
      fireEvent.click(increaseButton);
      const decreaseButton = screen.getByText("-");
      fireEvent.click(decreaseButton);
      expect(mockProduct.onRemoveFromBasket).toHaveBeenCalledWith(
        mockProduct.product.id
      );
    });

    it("decreases quantity and removes from basket when '-' button is clicked and quantity > 1", () => {
      render(<ProductCard {...mockProduct} />);
      const increaseButton = screen.getByText("+");
      fireEvent.click(increaseButton);
      fireEvent.click(increaseButton);
      const decreaseButton = screen.getByText("-");
      fireEvent.click(decreaseButton);
      expect(mockProduct.onRemoveFromBasket).toHaveBeenCalledWith(
        mockProduct.product.id
      );
      fireEvent.click(decreaseButton);
      expect(mockProduct.onRemoveFromBasket).toHaveBeenCalledTimes(2);
    });

    it("removes from basket when 'Remove' button is clicked", () => {
      render(<ProductCard {...mockProduct} />);
      const increaseButton = screen.getByText("+");
      fireEvent.click(increaseButton);
      const removeButton = screen.getByText("Remove");
      fireEvent.click(removeButton);
      expect(mockProduct.onRemoveFromBasket).toHaveBeenCalledWith(
        mockProduct.product.id
      );
    });
  });
});
