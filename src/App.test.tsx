import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios, { AxiosInstance } from "axios";
import { act } from "react-dom/test-utils";

import App from "./App";

jest.mock("axios");

const mockedProducts = [
  {
    id: 1,
    name: "Test Product 1",
    img: "http://example.com/test1.png",
    price: 10,
    colour: "Black",
  },
  {
    id: 2,
    name: "Test Product 2",
    img: "http://example.com/test2.png",
    price: 20,
    colour: "White",
  },
];

describe("App", () => {
  describe("when no error", () => {
    beforeEach(() => {
      axios.get = jest.fn().mockResolvedValue({ data: mockedProducts });
      render(<App />);
    });

    describe("rendering", () => {
      it("renders the app with products and basket is empty", async () => {
        await waitFor(() => {
          expect(screen.getAllByTestId("product-card")).toHaveLength(2);
          expect(screen.getByText("Your basket is empty.")).toBeInTheDocument();
        });
      });
    });

    describe("methods", () => {
      it("filters the products based on color", async () => {
        const colorFilter = screen.getByTestId("color-filter");
        userEvent.selectOptions(colorFilter, "Black");
        await waitFor(() => {
          expect(screen.getAllByTestId("product-card")).toHaveLength(1);
        });
      });

      it("adds a new product to the basket", async () => {
        await waitFor(() => {
          expect(screen.getAllByTestId("product-card")).toHaveLength(2);
        });

        const addButton = screen.getAllByText("+")[0];
        act(() => {
          userEvent.click(addButton);
        });

        await waitFor(() => {
          expect(screen.getByTestId("basket-item")).toBeInTheDocument();
        });
      });

      it("removes a product from the basket", async () => {
        await waitFor(() => {
          expect(screen.getAllByTestId("product-card")).toHaveLength(2);
        });

        const addButton = screen.getAllByText("+")[0];
        act(() => {
          userEvent.click(addButton);
        });

        await waitFor(() => {
          expect(screen.getByTestId("basket-item")).toBeInTheDocument();
        });

        const removeFromBasketButton = screen.getAllByText("Remove")[0];
        act(() => {
          userEvent.click(removeFromBasketButton);
        });

        await waitFor(() => {
          expect(screen.queryByTestId("basket-item")).not.toBeInTheDocument();
        });
      });

      it("updates a product in the basket", async () => {
        await waitFor(() => {
          expect(screen.getAllByTestId("product-card")).toHaveLength(2);
        });

        const addButton = screen.getAllByText("+")[0];
        act(() => {
          userEvent.click(addButton);
        });
        act(() => {
          userEvent.click(addButton);
        });

        const secondAddButton = screen.getAllByText("+")[1];
        act(() => {
          userEvent.click(secondAddButton);
        });

        await waitFor(() => {
          expect(screen.getAllByTestId("basket-item")).toHaveLength(2);
        });
      });
    });
  });
});
