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
const outType = "outbound";
const inType = "inbound";

const RTLrender = (stationsState, type) => {
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

  const { getByTestId, getAllByTestId, queryByTestId } = RTLrender(
    state,
    outType
  );

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
  expect(queryByTestId("ts-btn")).toBeFalsy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getAllByTestId("ts-btn")).toBeTruthy();
  expect(getAllByTestId("ts-btn").length % 3).toBe(0); // for every row there must be 3 btns
});

test("Renders without selected date", async () => {
  const state = {
    departureDate: dateToday,
    origin: stationOne,
    destination: stationTwo
  };

  const { getByTestId, getByLabelText } = RTLrender(state, inType);

  // header
  expect(getByTestId("tt-header").textContent).toBeTruthy();
  expect(getByTestId("tt-info").textContent).toEqual(
    expect.stringMatching(/^[A-Z].*[A-Z].*/)
  );

  // content
  expect(getByTestId("tf-form")).toBeTruthy();
  expect(getByLabelText("Return").value).toBe("");

  expect(console.error).not.toHaveBeenCalled();
});

test("After selecting a date, flights are shown", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));

  const state = {
    departureDate: dateToday,
    origin: stationOne,
    destination: stationTwo
  };

  const {
    getByTestId,
    getAllByTestId,
    queryByTestId,
    getByLabelText
  } = RTLrender(state, inType);

  // input field manipulation
  expect(getByLabelText("Return").value).toBe("");
  fireEvent.change(getByLabelText("Return"), {
    target: {
      value: convertDate().isoDate
    }
  });
  expect(getByLabelText("Return").value).not.toBe("");
  fireEvent.submit(getByTestId("tf-form"));

  // flights are coming!
  expect(getByTestId("spinner")).toBeTruthy();
  expect(queryByTestId("ts-btn")).toBeFalsy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getAllByTestId("ts-btn")).toBeTruthy();
  expect(getAllByTestId("ts-btn").length % 3).toBe(0); // for every row there must be 3 btns
});
