import React from "react";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

import TimetableSelect from "../TimetableSelect";
import { stationsReducer } from "components/providers/StationsProvider";
import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";
import TestCartProvider from "components/providers/__mocks__/TestCartProvider";

import {
  dateToday,
  dateTomorrow,
  dateLater,
  stationOne,
  stationTwo,
  flightsOneToTwo,
  flightsTwoToOne
} from "components/providers/__mocks__/mockValues";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  console.error.mockClear();
  mockStationsReducer.mockClear();
});

console.error = jest.fn();
const mockStationsReducer = jest.fn(stationsReducer);

// initials
const outboundType = "outbound";
const inboundType = "inbound";

test("Outbound <TimetableSelect /> renders with no restrictions", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));
  const { getByTestId, getAllByTestId, queryByTestId } = render(
    <TestStationsProvider
      state={{
        departureDate: dateTomorrow,
        origin: stationOne,
        destination: stationTwo
      }}
    >
      <TestCartProvider>
        <TimetableSelect type={outboundType} />
      </TestCartProvider>
    </TestStationsProvider>
  );
  expect(getByTestId("spinner")).toBeTruthy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();

  // Navigation bar
  expect(getByTestId("ts-prev-day")).toBeTruthy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(getByTestId("ts-next-day")).toBeTruthy();

  // Grid table
  expect(getAllByTestId("ts-table-header").length).toEqual(1);
  expect(getAllByTestId("ts-basic-btn").length).toEqual(5);
  expect(getAllByTestId("ts-standard-btn").length).toEqual(5);
  expect(getAllByTestId("ts-plus-btn").length).toEqual(5);
});

test("Outbound <TimetableSelct /> renders and navigation restrictions apply with return the day after tomorrow", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));
  const { getByTestId, queryByTestId } = render(
    <TestStationsProvider
      state={{
        departureDate: dateToday,
        returnDate: dateLater,
        origin: stationOne,
        destination: stationTwo
      }}
    >
      <TestCartProvider>
        <TimetableSelect type={outboundType} />
      </TestCartProvider>
    </TestStationsProvider>
  );
  expect(getByTestId("spinner")).toBeTruthy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();

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

test("Outbound <TimetableSelct /> renders and navigation restrictions apply with return tomorrow", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));
  const { getByTestId, queryByTestId } = render(
    <TestStationsProvider
      state={{
        departureDate: dateToday,
        returnDate: dateTomorrow,
        origin: stationOne,
        destination: stationTwo
      }}
    >
      <TestCartProvider>
        <TimetableSelect type={outboundType} />
      </TestCartProvider>
    </TestStationsProvider>
  );
  expect(getByTestId("spinner")).toBeTruthy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();

  // Navigation bar with current today and return tomorrow
  expect(queryByTestId("ts-prev-day")).toBeFalsy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(queryByTestId("ts-next-day")).toBeFalsy();
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
