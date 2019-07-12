import React from "react";
import { render, cleanup } from "@testing-library/react";

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
});

console.error = jest.fn();

/*

  const { setToggle, animation } = props;
  const { cart, cartDispatch } = useContext(CartContext);
  const {
    stations: { origin, destination }
  } = useContext(StationsContext);

*/

test.skip("Renders without errors with isSeparated=false and matches snapshot", () => {
  const { container, debug } = render(
    <>
      <div id="portal"></div>
      <TestStationsProvider>
        <TestCartProvider>
          <CartModal />
        </TestCartProvider>
      </TestStationsProvider>
    </>
  );
  debug();
  expect(console.error).not.toHaveBeenCalled();
});
