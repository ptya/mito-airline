import React from "react";
import {
  render,
  waitForElementToBeRemoved,
  fireEvent
} from "@testing-library/react";

import App from "../App";

// mocks
import {
  stations,
  dateToday,
  flightsOneToTwo
} from "components/providers/__mocks__/mockValues";

// ! mute console.error until React 16.9 as fetching causes trouble
console.error = jest.fn();

function RTLrender() {
  return render(<App />);
}

test("App renders correctly", async () => {
  fetch.mockResponseOnce(JSON.stringify(stations));
  const { getByTestId, getByText } = RTLrender();

  expect(getByTestId("spinner")).toBeTruthy();
  await waitForElementToBeRemoved(() => getByTestId("spinner"));
  expect(getByText("Mito Airline")).toBeTruthy();
});

test("App transitions correctly from Home to Selection and back", async () => {
  fetch.mockResponseOnce(JSON.stringify(stations));
  fetch.mockResponseOnce(JSON.stringify(flightsOneToTwo(dateToday)));
  const {
    getByTestId,
    getByText,
    getByLabelText,
    getAllByTestId
  } = RTLrender();

  expect(getByTestId("spinner")).toBeTruthy();
  await waitForElementToBeRemoved(() => getByTestId("spinner"));

  fireEvent.focus(getByLabelText("Origin"));
  fireEvent.change(getByLabelText("Origin"), {
    target: {
      value: "Bu"
    }
  });
  fireEvent.click(getByTestId("suggestion"));
  fireEvent.blur(getByLabelText("Origin"));

  fireEvent.focus(getByLabelText("Destination"));
  fireEvent.change(getByLabelText("Destination"), {
    target: {
      value: "Ba"
    }
  });
  fireEvent.click(getByTestId("suggestion"));

  fireEvent.change(getByLabelText("Departure"), {
    target: {
      value: dateToday.isoDate
    }
  });

  fireEvent.submit(getByTestId("h-form"));
  await waitForElementToBeRemoved(() => getByTestId("h-form"));

  expect(getAllByTestId("ts-btn")).toBeTruthy();
  expect(getByText("Choose an outbound flight")).toBeTruthy();

  fireEvent.click(getByTestId("sh-logo"));
  await waitForElementToBeRemoved(() => getByTestId("sh-logo"));

  expect(getByLabelText("Origin")).toHaveValue("Budapest");
  expect(getByLabelText("Destination")).toHaveValue("Barcelona");
  expect(getByLabelText("Departure")).toHaveValue("");
});
