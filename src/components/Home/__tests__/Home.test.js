import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

// components
import Home from "../Home";

// context
import StationsProvider, {
  originSession,
  destSession
} from "components/providers/StationsProvider";

// mocks
import {
  stationOne,
  stationTwo,
  dateToday,
  stations
} from "components/providers/__mocks__/mockValues";

// ! mute console.error until React 16.9 as fetching causes trouble
console.error = jest.fn();

afterEach(() => {
  sessionStorage.clear();
  sessionStorage.setItem.mockClear();
});

function RTLrender() {
  return render(
    <Router>
      <StationsProvider>
        <Home />
      </StationsProvider>
    </Router>
  );
}

test("Renders in first time mode", async () => {
  fetch.mockResponseOnce(JSON.stringify(stations));

  const { getByTestId, queryByTestId, getByLabelText } = RTLrender();

  expect(getByTestId("spinner")).toBeTruthy();
  await wait();

  // header
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getByTestId("h-head")).toBeTruthy();
  expect(getByTestId("h-head").textContent).toBe("Mito Airline");

  // form
  expect(getByLabelText("Origin")).toBeTruthy();
  expect(getByLabelText("Origin").value).toBe("");
  expect(getByLabelText("Destination")).toBeTruthy();
  expect(getByLabelText("Destination").value).toBe("");
  expect(getByLabelText("Departure")).toBeTruthy();
  expect(getByLabelText("Departure").value).toBe("");
  expect(getByLabelText("Return")).toBeTruthy();
  expect(getByLabelText("Return").value).toBe("");
  expect(queryByTestId("error")).toBeFalsy();
  expect(queryByTestId("suggestion")).toBeFalsy();
  expect(getByTestId("h-btn")).toBeTruthy();
});

test("Renders with stations in sessionStorage", async () => {
  fetch.mockResponseOnce(JSON.stringify(stations));
  sessionStorage.setItem(originSession, JSON.stringify(stationOne));
  sessionStorage.setItem(destSession, JSON.stringify(stationTwo));

  const { getByTestId, queryByTestId, getByLabelText } = RTLrender();

  expect(Object.keys(sessionStorage.__STORE__)).toHaveLength(2);
  expect(getByTestId("spinner")).toBeTruthy();
  await wait();
  // header
  expect(queryByTestId("spinner")).toBeFalsy();
  expect(getByTestId("h-head")).toBeTruthy();
  expect(getByTestId("h-head").textContent).toBe("Mito Airline");

  // form
  expect(getByLabelText("Origin")).toBeTruthy();
  expect(getByLabelText("Origin").value).toBe("Barcelona");
  expect(getByLabelText("Destination")).toBeTruthy();
  expect(getByLabelText("Destination").value).toBe("Budapest");
  expect(getByLabelText("Departure")).toBeTruthy();
  expect(getByLabelText("Departure").value).toBe("");
  expect(getByLabelText("Return")).toBeTruthy();
  expect(getByLabelText("Return").value).toBe("");
  expect(queryByTestId("error")).toBeFalsy();
  expect(queryByTestId("suggestion")).toBeFalsy();
  expect(getByTestId("h-btn")).toBeTruthy();
});

test("Can't submit until errors are present", async () => {
  fetch.mockResponseOnce(JSON.stringify(stations));

  const {
    getByTestId,
    queryByTestId,
    getByLabelText,
    getAllByTestId,
    getByText,
    queryByText
  } = RTLrender();

  await wait();
  fireEvent.click(getByTestId("h-btn"));

  expect(getAllByTestId("error")).toHaveLength(3);
  expect(getByText("Please select origin")).toBeTruthy();
  expect(getByText("Please select destination")).toBeTruthy();
  expect(getByText("Please select departure")).toBeTruthy();

  fireEvent.change(getByLabelText("Origin"), {
    target: {
      value: "Buda"
    }
  });
  fireEvent.focus(getByLabelText("Origin"));
  fireEvent.click(getByTestId("suggestion"));
  fireEvent.blur(getByLabelText("Origin"));

  expect(getAllByTestId("error")).toHaveLength(2);
  expect(queryByText("Please select origin")).toBeFalsy();
  expect(getByText("Please select destination")).toBeTruthy();
  expect(getByText("Please select departure")).toBeTruthy();

  fireEvent.click(getByTestId("h-btn"));

  expect(getAllByTestId("error")).toHaveLength(2);
  expect(queryByText("Please select origin")).toBeFalsy();
  expect(getByText("Please select destination")).toBeTruthy();
  expect(getByText("Please select departure")).toBeTruthy();
  expect(sessionStorage.setItem).not.toHaveBeenCalled();

  fireEvent.change(getByLabelText("Destination"), {
    target: {
      value: "Barc"
    }
  });
  fireEvent.focus(getByLabelText("Destination"));
  fireEvent.click(getByTestId("suggestion"));
  fireEvent.blur(getByLabelText("Destination"));

  expect(getAllByTestId("error")).toHaveLength(1);
  expect(queryByText("Please select origin")).toBeFalsy();
  expect(queryByText("Please select destination")).toBeFalsy();
  expect(getByText("Please select departure")).toBeTruthy();

  fireEvent.click(getByTestId("h-btn"));

  expect(getAllByTestId("error")).toHaveLength(1);
  expect(queryByText("Please select origin")).toBeFalsy();
  expect(queryByText("Please select destination")).toBeFalsy();
  expect(getByText("Please select departure")).toBeTruthy();
  expect(sessionStorage.setItem).not.toHaveBeenCalled();

  fireEvent.change(getByLabelText("Departure"), {
    target: {
      value: dateToday.isoDate
    }
  });

  expect(queryByTestId("error")).toBeFalsy();
  expect(queryByText("Please select origin")).toBeFalsy();
  expect(queryByText("Please select destination")).toBeFalsy();
  expect(queryByText("Please select departure")).toBeFalsy();

  fireEvent.click(getByTestId("h-btn"));

  expect(queryByTestId("error")).toBeFalsy();
  expect(queryByText("Please select origin")).toBeFalsy();
  expect(queryByText("Please select destination")).toBeFalsy();
  expect(queryByText("Please select departure")).toBeFalsy();
  expect(sessionStorage.setItem).toHaveBeenCalled();
});
