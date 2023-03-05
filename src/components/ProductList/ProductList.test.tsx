import { render, screen } from "@testing-library/react";

import { Product, ProductListProps } from "@/interfaces";

import ProductList from "./index";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    img: "http://example.com/img1.png",
    price: 10,
    colour: "red",
  },
  {
    id: 2,
    name: "Product 2",
    img: "http://example.com/img2.png",
    price: 5,
    colour: "blue",
  },
];

const mockProps: ProductListProps = {
  products: mockProducts,
  onAddToBasket: jest.fn(),
  onRemoveFromBasket: jest.fn(),
};

describe("ProductList", () => {
  it("renders a list of products", () => {
    render(<ProductList {...mockProps} />);
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Product 2")).toBeInTheDocument();
  });

  it("renders a ProductCard for each product", () => {
    render(<ProductList {...mockProps} />);
    expect(screen.getAllByRole("article")).toHaveLength(2);
  });

  it("passes the correct props to each ProductCard", () => {
    render(<ProductList {...mockProps} />);
    const productCards = screen.getAllByRole("article");
    expect(productCards[0]).toHaveAttribute("data-testid", "product-card-1");
    expect(productCards[1]).toHaveAttribute("data-testid", "product-card-2");
    expect(productCards[0]).toHaveAttribute("data-name", "Product 1");
    expect(productCards[1]).toHaveAttribute("data-name", "Product 2");
  });
});
