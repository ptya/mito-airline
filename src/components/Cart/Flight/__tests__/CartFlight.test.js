import React from "react";
import { render, cleanup } from "@testing-library/react";

// components
import CartFlight from "../CartFlight";

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

test("Renders without errors with isSeparated=false and matches snapshot", () => {
  const { container } = render(
    <CartFlight
      from={stationOne}
      to={stationTwo}
      flight={flight}
      isSeparated={false}
    />
  );
  expect(container).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});

test("Renders without errors with isSeparated=true and matches snapshot", () => {
  const { container } = render(
    <CartFlight
      from={stationOne}
      to={stationTwo}
      flight={flight}
      isSeparated={true}
    />
  );
  expect(container).toMatchSnapshot();
  expect(console.error).not.toHaveBeenCalled();
});
