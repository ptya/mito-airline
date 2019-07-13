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

function renderModal(cartState) {
  const stationsState = {
    origin: stationOne,
    destination: stationTwo
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

test("Renders with 2 stations without errors and matches snapshot", () => {
  renderModal({
    inbound: flight,
    outbound: flight,
    total: 100
  });
  expect(document.body).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Renders with 1 station without errors and matches snapshot", () => {
  renderModal({
    inbound: null,
    outbound: flight,
    total: 100
  });
  expect(document.body).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Clicking on link toggles modal", () => {
  const { getByTestId } = renderModal({
    inbound: flight,
    outbound: flight,
    total: 100
  });
  expect(setToggle).not.toHaveBeenCalled();
  fireEvent.click(getByTestId("cm-btn"));
  expect(setToggle).toHaveBeenCalled();
});
