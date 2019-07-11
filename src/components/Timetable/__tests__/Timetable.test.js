import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

// components
import Timetable from "../Timetable";

// context
import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";
import CartProvider from "components/providers/CartProvider";

// utils
import { convertDate } from "utils/convertDate";

// mocks
import {
  dateToday,
  dateTomorrow,
  dateLater,
  stationOne,
  stationTwo,
  flightsOneToTwo
} from "components/providers/__mocks__/mockValues";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

// initials
const type = "outbound";

const RTLrender = stationsState => {
  // TODO:
  const context = render(
    <TestStationsProvider state={stationsState}>
      <CartProvider>
        <Timetable type={type} />
      </CartProvider>
    </TestStationsProvider>
  );
  return context;
};

test("Renders with selected date selected", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));

  const state = {
    departureDate: dateTomorrow,
    origin: stationOne,
    destination: stationTwo
  };

  const {
    debug,
    getByTestId,
    getAllByTestId,
    queryByTestId,
    container
  } = RTLrender(state);

  // header
  expect(getByTestId("tt-header").textContent).toBeTruthy();
  expect(getByTestId("tt-info").textContent).toEqual(
    expect.stringMatching(/^[A-Z].*[A-Z].*/)
  );

  // navigation
  expect(getByTestId("ts-prev-day").textContent).toBeTruthy();
  expect(getByTestId("ts-curr-day").textContent).toBeTruthy();
  expect(getByTestId("ts-next-day").textContent).toBeTruthy();

  // content
  expect(getByTestId("spinner")).toBeTruthy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();

  // TODO:
  debug();
});

test("Renders without selected date", async () => {
  // TODO:
});

test("After selecting a date, flights are shown", async () => {
  // TODO:
});
