import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

// components
import TimetableSelect from "../TimetableSelect";

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

// styles
import { colors } from "components/_styles/variables";

// ! mute console.error until React 16.9 as fetching causes trouble
console.error = jest.fn();

// initials
const type = "outbound";

const RTLrender = stationsState => {
  return render(
    <TestStationsProvider state={stationsState}>
      <CartProvider>
        <TimetableSelect type={type} />
      </CartProvider>
    </TestStationsProvider>
  );
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
  expect(btns[1]).toHaveStyleRule("background", colors.pink);

  fireEvent.click(btns[5]);
  active = btns.filter(btn => btn.className === activeClass);
  expect(active).toHaveLength(1);
  expect(btns[1]).not.toHaveStyleRule("background", colors.pink);
  expect(btns[5]).toHaveStyleRule("background", colors.pink);

  fireEvent.click(btns[10]);
  active = btns.filter(btn => btn.className === activeClass);
  expect(active).toHaveLength(1);
  expect(btns[1]).not.toHaveStyleRule("background", colors.pink);
  expect(btns[5]).not.toHaveStyleRule("background", colors.pink);
  expect(btns[10]).toHaveStyleRule("background", colors.pink);
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

test("Changing day changes the output", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));

  const state = {
    departureDate: dateToday,
    origin: stationOne,
    destination: stationTwo
  };

  const { getByTestId, queryByTestId, getAllByTestId } = RTLrender(state);

  await wait();

  expect(getByTestId("ts-curr-day")).toBeTruthy();
  const day1 = getByTestId("ts-curr-day").textContent;
  expect(getByTestId("ts-next-day")).toBeTruthy();

  fireEvent.click(getByTestId("ts-next-day"));

  expect(getByTestId("spinner")).toBeTruthy();

  await wait();

  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(getByTestId("ts-curr-day").textContent).not.toEqual(day1);
  expect(getAllByTestId("ts-btn")).toBeTruthy();
});
