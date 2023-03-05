import { render, screen } from "@testing-library/react";

import { BasketItem } from "@/interfaces";

import Basket from "./index";

const mockItems: BasketItem[] = [
  {
    id: 1,
    name: "Product 1",
    img: "http://example.com/img1.png",
    price: 10,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product 2",
    img: "http://example.com/img2.png",
    price: 5,
    quantity: 1,
  },
];

describe("Basket", () => {
  describe("rendering", () => {
    it("renders empty basket message if no items in basket", () => {
      render(<Basket items={[]} total={0} />);
      expect(screen.getByText("Your basket is empty.")).toBeInTheDocument();
    });

    it("renders basket items", () => {
      render(<Basket items={mockItems} total={25} />);
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });
});
