import React from "react";
import { render, cleanup, fireEvent, wait, act } from "@testing-library/react";

import TimetableForm from "../TimetableForm";
import StationsProvider, {
  StationsContext
} from "components/providers/StationsProvider";

import stations from "components/__mocks__/stations.json";

global.fetch = require("jest-fetch-mock");

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

test("<TimetableHeader /> renders without error and matches snapshot", () => {
  const { container } = render(
    <StationsContext.Provider
      value={{
        stations: {
          secondaryReturnDate: null
        }
      }}
    >
      <TimetableForm />
    </StationsContext.Provider>
  );

  expect(console.error).not.toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

test("Form is properly validated when empty", async () => {
  fetch.mockResponseOnce(JSON.stringify(stations));

  const { getByTestId, queryByTestId, getByLabelText } = render(
    <StationsProvider>
      <TimetableForm />
    </StationsProvider>
  );

  // wait for fetch to finish
  await wait();
  const form = getByTestId("tf-form");
  const input = getByLabelText("Return");

  // there is no error shown yet
  expect(queryByTestId("error")).toBeFalsy();

  // there should be error shown
  fireEvent.submit(form);
  expect(getByTestId("error")).toBeTruthy();

  // fill in the input so error disappears
  fireEvent.change(input, {
    target: {
      value: "2019.07.07"
    }
  });
  expect(queryByTestId("error")).toBeFalsy();

  // delete the input so error reappears
  fireEvent.change(input, {
    target: {
      value: ""
    }
  });
  expect(getByTestId("error")).toBeTruthy();
});

test("Form can be submitted", async () => {
  fetch.mockResponseOnce(JSON.stringify(stations));

  const { getByTestId, queryByTestId, getByLabelText } = render(
    <StationsProvider>
      <TimetableForm />
    </StationsProvider>
  );
  // wait for fetch to finish
  await wait();

  const form = getByTestId("tf-form");
  const input = getByLabelText("Return");

  // set value
  fireEvent.change(input, {
    target: {
      value: "2019.07.07"
    }
  });

  expect(input.value).toBe("Sun 7. Jul. 2019");

  fireEvent.submit(form);

  expect(queryByTestId("error")).toBeFalsy();

  /* THIS WILL ONLY WORK IN REACT 16.9+
  expect(console.error).not.toHaveBeenCalled();
  */
});
