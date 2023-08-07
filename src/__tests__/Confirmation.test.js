// test if a file called Confirmation.js exists
const fs = require("fs");
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import OrderConfirmation from "../components/OrderConfirmation";
import { testOrder } from "../sampleTestData";

describe("files exist", () => {
  it("ConfirmationPage.jsx should exist", () => {
    expect(fs.existsSync("./src/components/ConfirmationPage.jsx")).toBe(true);
  });
  it("OrderConfirmation.jsx should exist", () => {
    expect(fs.existsSync("./src/components/OrderConfirmation.jsx")).toBe(true);
  });
});

// pass the test data as order prop into OrderConfirmation component

test("renders confirmation page with name, address and items, and order id", () => {
  console.log("the test order is", testOrder);
  render(<OrderConfirmation order={testOrder} />);
  const name = screen.getAllByText(/example/)[0];
  const address = screen.getAllByText(/123 Main St/)[0];
  const items = screen.getAllByText(/Burger/)[0];
  const orderId = screen.getAllByText(/12345/)[0];
  expect(name).toBeInTheDocument();
  expect(address).toBeInTheDocument();
  expect(items).toBeInTheDocument();
  expect(orderId).toBeInTheDocument();
});
