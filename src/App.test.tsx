import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";

import App from "./App";

jest.mock("axios");

const mockProducts = [
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
  {
    id: 3,
    name: "Product 3",
    img: "http://example.com/img3.png",
    price: 20,
    colour: "green",
  },
];

const mockAxiosGet = jest.fn();
jest.mock("axios", () => ({
  get: mockAxiosGet,
}));

mockAxiosGet.mockResolvedValue({ data: mockProducts });
mockAxiosGet.mockReset();

describe("App", () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders App component", () => {
    render(<App />);
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Your basket")).toBeInTheDocument();
  });

  it("displays products on load", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(
        mockProducts.length
      );
    });
  });

  it("adds product to basket when add button is clicked", async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Add to basket")[0]);
      expect(screen.getByText("Qty: 1")).toBeInTheDocument();
      expect(screen.getByText("Total: $10.00")).toBeInTheDocument();
    });
  });

  it("updates product quantity in basket when quantity is changed", async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Add to basket")[0]);
      expect(screen.getByText("Qty: 1")).toBeInTheDocument();
      expect(screen.getByText("Total: $10.00")).toBeInTheDocument();
      fireEvent.click(screen.getByText("+"));
      expect(screen.getByText("Qty: 2")).toBeInTheDocument();
      expect(screen.getByText("Total: $20.00")).toBeInTheDocument();
    });
  });

  it("removes product from basket when remove button is clicked", async () => {
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getAllByText("Add to basket")[0]);
      expect(screen.getByText("Qty: 1")).toBeInTheDocument();
      expect(screen.getByText("Total: $10.00")).toBeInTheDocument();
      fireEvent.click(screen.getByText("Remove"));
      expect(screen.queryByText("Qty: 1")).not.toBeInTheDocument();
      expect(screen.getByText("Your basket is empty.")).toBeInTheDocument();
    });
  });

  it("filters products by colour", async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Colour"));
      fireEvent.click(screen.getByText("Red"));
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.queryByText("Product 2")).not.toBeInTheDocument();
      expect(screen.queryByText("Product 3")).not.toBeInTheDocument();
    });
  });

  it("resets filters when reset button is clicked", async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    render(<App />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Colour"));
      fireEvent.click(screen.getByText("Red"));
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
      expect(screen.getByText("Red")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Reset"));

      await waitFor(() => {
        expect(screen.getAllByTestId("product-card")).toHaveLength(3);
        expect(screen.queryByText("Red")).not.toBeInTheDocument();
      });
    });
  });
});
