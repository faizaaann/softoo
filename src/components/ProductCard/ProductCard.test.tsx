import { fireEvent, render, screen } from "@testing-library/react";

import { Product, ProductCardProps } from "@/interfaces";

import ProductCard from "./index";

const mockProduct: Product = {
  id: 1,
  name: "Test Product",
  img: "http://example.com/test.png",
  price: 10.99,
  colour: "red",
};

const mockProps: ProductCardProps = {
  product: mockProduct,
  onAddToBasket: jest.fn(),
  onRemoveFromBasket: jest.fn(),
};

describe("ProductCard", () => {
  beforeEach(() => {
    render(<ProductCard {...mockProps} />);
  });

  describe("rendering", () => {
    it("renders the product name", () => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
    });

    it("renders the product price", () => {
      expect(screen.getByText("£10.00")).toBeInTheDocument();
    });

    it("renders the product image", () => {
      expect(screen.getByAltText("Product 1")).toBeInTheDocument();
    });
  });

  describe("methods", () => {
    it("calls onAddToBasket when increment button is clicked", () => {
      fireEvent.click(screen.getByText("+"));
      expect(mockProps.onAddToBasket).toHaveBeenCalledWith(1, 1);
    });

    it("calls onRemoveFromBasket when quantity is 0 and remove button is clicked", () => {
      fireEvent.click(screen.getByText("Remove"));
      expect(mockProps.onRemoveFromBasket).toHaveBeenCalledWith(1);
    });

    it("calls onAddToBasket when quantity is 1 and remove button is clicked", () => {
      fireEvent.click(screen.getByText("+"));
      fireEvent.click(screen.getByText("Remove"));
      expect(mockProps.onAddToBasket).toHaveBeenCalledWith(1, 1);
    });

    it("disables decrement button if quantity is 0", () => {
      expect(screen.getByText("-")).toBeDisabled();
    });
  });
});
