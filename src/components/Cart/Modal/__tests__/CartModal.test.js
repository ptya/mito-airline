import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

// components
import CartModal from "../CartModal";

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
  cleanup();
  console.error.mockClear();
  setToggle.mockClear();
});

console.error = jest.fn();
const setToggle = jest.fn();

function renderModal() {
  const stationsState = {
    origin: stationOne,
    destination: stationTwo
  };
  const cartState = {
    inbound: flight,
    outbound: flight,
    total: 100
  };
  const context = render(
    <TestStationsProvider state={stationsState}>
      <TestCartProvider state={cartState}>
        <CartModal setToggle={setToggle} animation={{}} />
      </TestCartProvider>
    </TestStationsProvider>
  );
  return context;
}

test("Renders without errors and matches snapshot", () => {
  renderModal();
  expect(document.body).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Clicking on link toggles modal", () => {
  const { getByTestId } = renderModal();
  expect(setToggle).not.toHaveBeenCalled();
  fireEvent.click(getByTestId("cm-btn"));
  expect(setToggle).toHaveBeenCalled();
});
