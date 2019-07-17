import React from "react";
import {
  render,
  fireEvent,
  waitForElementToBeRemoved
} from "@testing-library/react";

// components
import Cart from "../Cart";

// context
import TestCartProvider from "components/providers/__mocks__/TestCartProvider";
import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";

// mocks
import {
  stationOne,
  stationTwo,
  flight
} from "components/providers/__mocks__/mockValues";

afterEach(() => {
  console.error.mockClear();
});

console.error = jest.fn();

function renderCart(cartState) {
  const stationsState = {
    origin: stationOne,
    destination: stationTwo
  };
  return render(
    <TestStationsProvider state={stationsState}>
      <TestCartProvider state={cartState}>
        <Cart />
      </TestCartProvider>
    </TestStationsProvider>
  );
}

test("Renders without stations and matches snapshot", () => {
  const { container } = renderCart();
  expect(container).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Renders with outbound flight and matches snapshot", () => {
  const { container } = renderCart({
    inbound: null,
    outbound: flight,
    total: 1000
  });
  expect(container).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Renders with inbound flight and matches snapshot", () => {
  const { container } = renderCart({
    inbound: flight,
    outbound: null,
    total: 100
  });
  expect(container).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Renders with all flights and matches snapshot", () => {
  const { container } = renderCart({
    inbound: flight,
    outbound: flight,
    total: 100
  });
  expect(container).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Clicking pay now toggles modal", () => {
  const { getByTestId, queryByTestId } = renderCart({
    inbound: flight,
    outbound: flight,
    total: 100
  });

  expect(queryByTestId("cm-btn")).toBeFalsy();
  fireEvent.click(getByTestId("pay-btn"));
  expect(getByTestId("cm-btn")).toBeTruthy();
});

test("In modal, clicking no thanks, resets cart", async () => {
  const { getByTestId, queryByTestId, getAllByText, getByText } = renderCart({
    inbound: flight,
    outbound: flight,
    total: 100
  });

  expect(queryByTestId("cm-btn")).toBeFalsy();

  fireEvent.click(getByTestId("pay-btn"));
  expect(getByTestId("cm-btn")).toBeTruthy();

  fireEvent.click(getByTestId("cm-btn"));
  await waitForElementToBeRemoved(() => getByTestId("my-portal"));

  expect(queryByTestId("cm-btn")).toBeFalsy();
  expect(getAllByText("$0")).toBeTruthy();
  expect(getByText("Choose an outbound flight")).toBeTruthy();
  expect(getByTestId("pay-btn").disabled).toBeTruthy();
});
