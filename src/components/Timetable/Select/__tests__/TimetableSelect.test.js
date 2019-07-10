import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

import TimetableSelect from "../TimetableSelect";
import { stationsReducer } from "components/providers/StationsProvider";
import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";
import TestCartProvider from "components/providers/__mocks__/TestCartProvider";
import CartProvider from "components/providers/CartProvider";

import {
  dateToday,
  dateTomorrow,
  dateLater,
  stationOne,
  stationTwo,
  flightsOneToTwo,
  flightsTwoToOne
} from "components/providers/__mocks__/mockValues";

import { convertDate } from "utils/convertDate";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  console.error.mockClear();
  mockStationsReducer.mockClear();
});

console.error = jest.fn();
const mockStationsReducer = jest.fn(stationsReducer);

// initials
const type = "outbound";

const RTLrender = stationsState => {
  const context = render(
    <TestStationsProvider state={stationsState}>
      <CartProvider>
        <TimetableSelect type={type} />
      </CartProvider>
    </TestStationsProvider>
  );
  return context;
};

test("Renders with no restrictions", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));

  const state = {
    departureDate: dateTomorrow,
    origin: stationOne,
    destination: stationTwo
  };

  const { getByTestId, getAllByTestId, queryByTestId } = RTLrender(state);
  expect(getByTestId("spinner")).toBeTruthy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();

  // Navigation bar
  expect(getByTestId("ts-prev-day")).toBeTruthy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(getByTestId("ts-next-day")).toBeTruthy();

  // Grid table
  expect(getAllByTestId("ts-table-header").length).toEqual(1);
  expect(getAllByTestId("ts-btn").length).toEqual(15);
});

test("Navigation restrictions apply with return the day after tomorrow", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));

  const state = {
    departureDate: dateToday,
    returnDate: dateLater,
    origin: stationOne,
    destination: stationTwo
  };

  const { getByTestId, queryByTestId } = RTLrender(state);

  await wait();

  // Navigation bar with current today and return the day after tomorrow
  expect(queryByTestId("ts-prev-day")).toBeFalsy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(getByTestId("ts-next-day")).toBeTruthy();

  // Navigation bar with current day one day before return
  fireEvent.click(getByTestId("ts-next-day"));
  await wait();
  expect(getByTestId("ts-prev-day")).toBeTruthy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(queryByTestId("ts-next-day")).toBeFalsy();
});

test("Navigation restrictions apply with return tomorrow", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));

  const state = {
    departureDate: dateToday,
    returnDate: dateTomorrow,
    origin: stationOne,
    destination: stationTwo
  };
  const { getByTestId, queryByTestId } = RTLrender(state);

  await wait();

  // Navigation bar with current today and return tomorrow
  expect(queryByTestId("ts-prev-day")).toBeFalsy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(queryByTestId("ts-next-day")).toBeFalsy();
});

test("Only one flight can be selected", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));

  const state = {
    departureDate: dateTomorrow,
    origin: stationOne,
    destination: stationTwo
  };
  const { getAllByTestId } = RTLrender(state);

  await wait();
  const btns = getAllByTestId("ts-btn");

  fireEvent.click(btns[1]);
  const activeClass = btns[1].className;
  let active = btns.filter(btn => btn.className === activeClass);
  expect(active).toHaveLength(1);

  fireEvent.click(btns[5]);
  active = btns.filter(btn => btn.className === activeClass);
  expect(active).toHaveLength(1);
  expect(btns[1].className === activeClass).toBeFalsy();
  expect(btns[5].className === activeClass).toBeTruthy();

  fireEvent.click(btns[10]);
  active = btns.filter(btn => btn.className === activeClass);
  expect(active).toHaveLength(1);
  expect(btns[1].className === activeClass).toBeFalsy();
  expect(btns[5].className === activeClass).toBeFalsy();
  expect(btns[10].className === activeClass).toBeTruthy();
});

test("Past flights are disabled", async () => {
  const data = flightsOneToTwo(dateToday);
  fetch.mockResponseOnce(JSON.stringify(data));

  const state = {
    departureDate: dateToday,
    origin: stationOne,
    destination: stationTwo
  };
  const { getAllByTestId } = RTLrender(state);

  await wait();
  const btns = getAllByTestId("ts-btn");
  const disabled = btns.filter(btn => btn.disabled);
  const inPast = data.filter(
    item => convertDate(item.departure).date.getTime() < Date.now()
  ).length;

  expect(disabled.length).toBe(inPast * 3); // 3 buttons in a row
});

test.skip("Form can be submitted", async () => {
  const { getByTestId, queryByTestId, getByLabelText } = render(
    <TestStationsProvider reducer={mockStationsReducer}>
      <TimetableSelect />
    </TestStationsProvider>
  );

  const form = getByTestId("tf-form");
  const input = getByLabelText("Return");

  // set value
  fireEvent.change(input, {
    target: {
      value: "2019.07.07"
    }
  });

  expect(mockStationsReducer).toHaveBeenCalledWith(
    expect.any(Object),
    expect.objectContaining({
      type: "setSecondaryReturn"
    })
  );
  expect(input.value).toBe("Sun 7. Jul. 2019");

  fireEvent.submit(form);
  expect(mockStationsReducer).toHaveBeenLastCalledWith(
    expect.any(Object),
    expect.objectContaining({
      type: "setReturn"
    })
  );
  expect(queryByTestId("error")).toBeFalsy();
  expect(console.error).not.toHaveBeenCalled();
});
