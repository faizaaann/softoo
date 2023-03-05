import { fireEvent, render, screen } from "@testing-library/react";

import { Product } from "../../interfaces";
import Filters from "./index";

const mockProducts: Product[] = [
  {
    id: 1,
    name: "Product 1",
    img: "http://example.com/img1.png",
    price: 10,
    colour: "Black",
  },
  {
    id: 2,
    name: "Product 2",
    img: "http://example.com/img2.png",
    price: 5,
    colour: "Stone",
  },
  {
    id: 3,
    name: "Product 3",
    img: "http://example.com/img3.png",
    price: 15,
    colour: "Red",
  },
  {
    id: 4,
    name: "Product 4",
    img: "http://example.com/img4.png",
    price: 20,
    colour: "Stone",
  },
];

describe("Filters Component", () => {
  it("should render all color buttons", () => {
    render(<Filters products={mockProducts} setProducts={jest.fn()} />);
    const allColorButtons = screen.getAllByRole("option");
    expect(allColorButtons).toHaveLength(4);
    expect(allColorButtons[0]).toHaveTextContent("All");
    expect(allColorButtons[1]).toHaveTextContent("Black");
    expect(allColorButtons[2]).toHaveTextContent("Stone");
    expect(allColorButtons[3]).toHaveTextContent("Red");
  });

  it("should filter products by color when color button is clicked", () => {
    const mockSetProducts = jest.fn();
    render(<Filters products={mockProducts} setProducts={mockSetProducts} />);
    fireEvent.change(screen.getByTestId("color-filter"), {
      target: { value: "Stone" },
    });
    expect(mockSetProducts).toHaveBeenCalledWith([
      mockProducts[1],
      mockProducts[3],
    ]);
  });

  it("should reset products to original list when 'All' button is clicked", () => {
    const mockSetProducts = jest.fn();
    render(<Filters products={mockProducts} setProducts={mockSetProducts} />);
    fireEvent.change(screen.getByTestId("color-filter"), {
      target: { value: "Stone" },
    });
    fireEvent.change(screen.getByTestId("color-filter"), {
      target: { value: "All" },
    });
    expect(mockSetProducts).toHaveBeenCalledWith(mockProducts);
  });
});
