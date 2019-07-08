import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import TimetableForm from "../TimetableForm";
import { stationsReducer } from "components/providers/StationsProvider";
import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";

afterEach(() => {
  cleanup();
  console.error.mockClear();
  mockStationsReducer.mockClear();
});

console.error = jest.fn();
const mockStationsReducer = jest.fn(stationsReducer);

test("<TimetableForm /> renders without error and matches snapshot", () => {
  const { container } = render(
    <TestStationsProvider>
      <TimetableForm />
    </TestStationsProvider>
  );

  expect(console.error).not.toHaveBeenCalled();
  expect(container).toMatchSnapshot();
});

test("Form is properly validated when empty", async () => {
  const { getByTestId, queryByTestId, getByLabelText } = render(
    <TestStationsProvider reducer={mockStationsReducer}>
      <TimetableForm />
    </TestStationsProvider>
  );

  // wait for fetch to finish
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
  expect(mockStationsReducer).toHaveBeenCalledWith(
    expect.any(Object),
    expect.objectContaining({
      type: "setSecondaryReturn"
    })
  );
  expect(queryByTestId("error")).toBeFalsy();

  // delete the input so error reappears
  fireEvent.change(input, {
    target: {
      value: ""
    }
  });
  expect(mockStationsReducer).toHaveBeenLastCalledWith(expect.any(Object), {
    secondaryReturnDate: null,
    type: "setSecondaryReturn"
  });
  expect(getByTestId("error")).toBeTruthy();
});

test("Form can be submitted", async () => {
  const { getByTestId, queryByTestId, getByLabelText } = render(
    <TestStationsProvider reducer={mockStationsReducer}>
      <TimetableForm />
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
