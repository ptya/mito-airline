import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

// components
import Selection from "../Selection";

// context
import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";

// mocks
import {
  stationOne,
  stationTwo,
  dateToday,
  flightsOneToTwo,
  flightsTwoToOne,
  dateTomorrow,
  dateLater
} from "components/providers/__mocks__/mockValues";

global.fetch = require("jest-fetch-mock");

function RTLrender(state) {
  const context = render(
    <Router>
      <TestStationsProvider state={state}>
        <Selection />
      </TestStationsProvider>
    </Router>
  );
  return context;
}

test("Renders in one way mode", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateToday
  };
  const {
    getByTestId,
    getByText,
    getAllByTestId,
    queryByTestId,
    getByLabelText
  } = RTLrender(state);

  // header
  expect(getByTestId("sh-logo")).toBeTruthy();
  expect(getByTestId("sh-origin").textContent).toEqual(
    expect.stringMatching(/^.*[A-Z]/)
  );
  expect(getByTestId("sh-dest").textContent).not.toBe("");
  expect(getByTestId("sh-switch")).toBeTruthy();

  // cart
  expect(getByText("Choose an outbound flight")).toBeTruthy();
  expect(getByTestId("pay-btn")).toBeTruthy();
  expect(getByTestId("pay-btn").disabled).toBeTruthy();

  // main area
  expect(getByText("Select Flight")).toBeTruthy();
  expect(getAllByTestId("tt-header")).toHaveLength(2);
  expect(getAllByTestId("tt-info")).toHaveLength(2);

  // departure flights
  expect(queryByTestId("ts-prev-day")).toBeFalsy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(getByTestId("ts-next-day")).toBeTruthy();
  expect(getByTestId("spinner")).toBeTruthy();
  expect(queryByTestId("ts-table-header")).toBeFalsy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getByTestId("ts-table-header")).toBeTruthy();
  expect(getAllByTestId("ts-btn")).toBeTruthy();

  // return form
  expect(getByTestId("tf-form")).toBeTruthy();
  expect(getByLabelText("Return").value).toBe("");
  expect(queryByTestId("error")).toBeFalsy();
});

test("Renders in return way mode", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateLater)));

  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateToday,
    returnDate: dateLater
  };
  const { getByTestId, getByText, getAllByTestId, queryByTestId } = RTLrender(
    state
  );

  // header
  expect(getByTestId("sh-logo")).toBeTruthy();
  expect(getByTestId("sh-origin").textContent).toEqual(
    expect.stringMatching(/^.*[A-Z]/)
  );
  expect(getByTestId("sh-dest").textContent).not.toBe("");
  expect(getByTestId("sh-switch")).toBeTruthy();

  // cart
  expect(getByText("Choose an outbound flight")).toBeTruthy();
  expect(getByTestId("pay-btn")).toBeTruthy();
  expect(getByTestId("pay-btn").disabled).toBeTruthy();

  // main area
  expect(getByText("Select Flight")).toBeTruthy();
  expect(getAllByTestId("tt-header")).toHaveLength(2);
  expect(getAllByTestId("tt-info")).toHaveLength(2);
  expect(queryByTestId("tf-form")).toBeFalsy();

  // flights
  expect(getAllByTestId("ts-prev-day")).toHaveLength(1);
  expect(getAllByTestId("ts-curr-day")).toHaveLength(2);
  expect(getAllByTestId("ts-next-day")).toHaveLength(2);
  expect(getAllByTestId("spinner")).toHaveLength(2);
  expect(queryByTestId("ts-table-header")).toBeFalsy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getAllByTestId("ts-table-header")).toHaveLength(2);
  expect(getAllByTestId("ts-btn")).toBeTruthy();
});

test("Selecting a return date shows return flights", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateLater)));

  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateToday
  };
  const {
    getByTestId,
    getAllByTestId,
    queryByTestId,
    getByLabelText
  } = RTLrender(state);

  // main area
  expect(getAllByTestId("tt-header")).toHaveLength(2);
  expect(getAllByTestId("tt-info")).toHaveLength(2);

  // departure flights
  expect(queryByTestId("ts-prev-day")).toBeFalsy();
  expect(getByTestId("ts-curr-day")).toBeTruthy();
  expect(getByTestId("ts-next-day")).toBeTruthy();
  expect(getByTestId("spinner")).toBeTruthy();
  expect(queryByTestId("ts-table-header")).toBeFalsy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getByTestId("ts-table-header")).toBeTruthy();
  expect(getAllByTestId("ts-btn")).toHaveLength(15);

  // return form
  expect(getByTestId("tf-form")).toBeTruthy();
  expect(getByLabelText("Return").value).toBe("");
  expect(queryByTestId("error")).toBeFalsy();

  fireEvent.change(getByLabelText("Return"), {
    target: {
      value: dateLater.isoDate
    }
  });

  fireEvent.submit(getByTestId("tf-form"));

  expect(queryByTestId("ts-form")).toBeFalsy();

  // flights
  expect(getAllByTestId("ts-prev-day")).toHaveLength(1);
  expect(getAllByTestId("ts-curr-day")).toHaveLength(2);
  expect(getAllByTestId("ts-next-day")).toHaveLength(2);
  expect(getAllByTestId("spinner")).toHaveLength(1);
  expect(getAllByTestId("ts-table-header")).toHaveLength(1);
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getAllByTestId("ts-table-header")).toHaveLength(2);
  expect(getAllByTestId("ts-btn")).toHaveLength(27);
});

test("Switching stations updates timetables", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateLater)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateToday)));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateLater)));

  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateToday,
    returnDate: dateLater
  };
  const { getByTestId, getAllByTestId, queryByTestId } = RTLrender(state);

  // header
  expect(getByTestId("sh-logo")).toBeTruthy();
  expect(getByTestId("sh-origin").textContent).toEqual(
    expect.stringMatching(/^.*[A-Z]/)
  );
  expect(getByTestId("sh-dest").textContent).not.toBe("");
  expect(getByTestId("sh-switch")).toBeTruthy();

  // flights before switch
  expect(getAllByTestId("tt-info")[0].textContent).toBe(
    `${stationOne.shortName}${stationTwo.shortName}`
  );
  expect(getAllByTestId("tt-info")[1].textContent).toBe(
    `${stationTwo.shortName}${stationOne.shortName}`
  );
  expect(getAllByTestId("spinner")).toHaveLength(2);
  expect(queryByTestId("ts-table-header")).toBeFalsy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getAllByTestId("ts-table-header")).toHaveLength(2);
  expect(getAllByTestId("ts-btn")).toBeTruthy();

  fireEvent.click(getByTestId("sh-switch"));

  // flights after switch
  expect(getAllByTestId("tt-info")[0].textContent).toBe(
    `${stationTwo.shortName}${stationOne.shortName}`
  );
  expect(getAllByTestId("tt-info")[1].textContent).toBe(
    `${stationOne.shortName}${stationTwo.shortName}`
  );
  expect(getAllByTestId("spinner")).toHaveLength(2);
  expect(queryByTestId("ts-table-header")).toBeFalsy();
  await wait();
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getAllByTestId("ts-table-header")).toHaveLength(2);
  expect(getAllByTestId("ts-btn")).toBeTruthy();
});

test("Selecting flights updates cart", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateLater)));

  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateTomorrow,
    returnDate: dateLater
  };
  const { getByTestId, getAllByTestId, queryByTestId } = RTLrender(state);

  await wait();
  const btns = getAllByTestId("ts-btn");
  expect(queryByTestId("cart-flight")).toBeFalsy();

  // select 1 from departure
  fireEvent.click(btns[7]);
  expect(getAllByTestId("cart-flight")).toHaveLength(1);
  await wait(() =>
    expect(getByTestId("c-total").textContent).toEqual("Total $64")
  );

  // overwrite 1 from departure
  fireEvent.click(btns[9]);
  expect(getAllByTestId("cart-flight")).toHaveLength(1);
  await wait(() =>
    expect(getByTestId("c-total").textContent).toEqual("Total $45")
  );

  // select 1 from return
  fireEvent.click(btns[15]);
  expect(getAllByTestId("cart-flight")).toHaveLength(2);
  await wait(() =>
    expect(getByTestId("c-total").textContent).toEqual("Total $119")
  );

  // overwrite 1 from return
  fireEvent.click(btns[16]);
  expect(getAllByTestId("cart-flight")).toHaveLength(2);
  await wait(() =>
    expect(getByTestId("c-total").textContent).toEqual("Total $125")
  );
});

test("Single trip can be bought", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));

  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateTomorrow
  };
  const { getByTestId, getAllByTestId, queryByTestId, getByText } = RTLrender(
    state
  );

  await wait();
  const btns = getAllByTestId("ts-btn");

  expect(getByTestId("pay-btn").disabled).toBeTruthy();
  expect(queryByTestId("my-portal")).toBeFalsy();
  expect(queryByTestId("cm-btn")).toBeFalsy();
  expect(queryByTestId("cart-flight")).toBeFalsy();

  fireEvent.click(btns[7]);
  expect(getByTestId("pay-btn").disabled).toBeFalsy();
  expect(getAllByTestId("cart-flight")).toHaveLength(1);

  fireEvent.click(getByTestId("pay-btn"));
  expect(getByTestId("my-portal")).toBeTruthy();
  expect(getByTestId("cm-btn")).toBeTruthy();
  expect(
    getByText("Thanks for buying your tickets at Mito Airlines")
  ).toBeTruthy();
  expect(getAllByTestId("cart-flight")).toHaveLength(2);
});

test("Return trip can be bought", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateLater)));

  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateTomorrow,
    returnDate: dateLater
  };

  const { getByTestId, getAllByTestId, queryByTestId, getByText } = RTLrender(
    state
  );

  await wait();
  const btns = getAllByTestId("ts-btn");

  expect(getByTestId("pay-btn").disabled).toBeTruthy();
  expect(queryByTestId("my-portal")).toBeFalsy();
  expect(queryByTestId("cm-btn")).toBeFalsy();
  expect(queryByTestId("cart-flight")).toBeFalsy();

  fireEvent.click(btns[7]);
  fireEvent.click(btns[15]);
  expect(getByTestId("pay-btn").disabled).toBeFalsy();
  expect(getAllByTestId("cart-flight")).toHaveLength(2);

  fireEvent.click(getByTestId("pay-btn"));
  expect(getByTestId("my-portal")).toBeTruthy();
  expect(getByTestId("cm-btn")).toBeTruthy();
  expect(
    getByText("Thanks for buying your tickets at Mito Airlines")
  ).toBeTruthy();
  expect(getAllByTestId("cart-flight")).toHaveLength(4);
});

test("Cancelling payment resets states", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateLater)));

  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateTomorrow,
    returnDate: dateLater
  };

  const { getByTestId, getAllByTestId, queryByTestId } = RTLrender(state);

  await wait();
  const btns = getAllByTestId("ts-btn");

  fireEvent.click(btns[7]);
  fireEvent.click(btns[15]);
  fireEvent.click(getByTestId("pay-btn"));
  expect(getAllByTestId("cart-flight")).toHaveLength(4);

  fireEvent.click(getByTestId("cm-btn"));
  expect(queryByTestId("cart-flight")).toBeFalsy();
});

test("Switching stations clears cart", async () => {
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateTomorrow)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateLater)));
  fetch.mockResponseOnce(JSON.stringify(flightsTwoToOne(dateTomorrow)));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateLater)));

  const state = {
    origin: stationOne,
    destination: stationTwo,
    departureDate: dateToday,
    returnDate: dateLater
  };
  const { getByTestId, getAllByTestId, queryByTestId } = RTLrender(state);

  await wait();
  const btns = getAllByTestId("ts-btn");

  fireEvent.click(btns[7]);
  fireEvent.click(btns[15]);
  expect(getAllByTestId("cart-flight")).toHaveLength(2);

  fireEvent.click(getByTestId("sh-switch"));
  expect(queryByTestId("cart-flight")).toBeFalsy();
});
