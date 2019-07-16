import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

// components
import SelectionHeader from "../SelectionHeader";

// context
import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";
import CartProvider from "components/providers/CartProvider";
import { stationsReducer } from "components/providers/StationsProvider";

// mocks
import {
  stationOne,
  stationTwo
} from "components/providers/__mocks__/mockValues";

afterEach(() => {
  console.error.mockClear();
  reducer.mockClear();
});

console.error = jest.fn();
const reducer = jest.fn(stationsReducer);

function RTLrender() {
  const state = {
    origin: stationOne,
    destination: stationTwo
  };
  const context = render(
    <Router>
      <TestStationsProvider state={state} reducer={reducer}>
        <CartProvider>
          <SelectionHeader />
        </CartProvider>
      </TestStationsProvider>
    </Router>
  );
  return context;
}

test("Renders without errors and matches snapshot", () => {
  const { container } = RTLrender();

  expect(container).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Switching between stations updates header", () => {
  const { getByTestId } = RTLrender();

  expect(getByTestId("sh-origin").textContent).toEqual(
    expect.stringContaining(stationOne.shortName)
  );
  expect(getByTestId("sh-dest").textContent).toBe(stationTwo.shortName);

  fireEvent.click(getByTestId("sh-switch"));

  expect(getByTestId("sh-origin").textContent).toEqual(
    expect.stringContaining(stationTwo.shortName)
  );
  expect(getByTestId("sh-dest").textContent).toBe(stationOne.shortName);

  expect(console.error).not.toHaveBeenCalled();
});

test("Clicking on logo redirects to home by clearing dates", () => {
  const { getByTestId } = RTLrender();

  fireEvent.click(getByTestId("sh-logo"));
  expect(reducer).toHaveBeenCalledWith(
    expect.any(Object),
    expect.objectContaining({
      type: "clearDates"
    })
  );

  expect(console.error).not.toHaveBeenCalled();
});
