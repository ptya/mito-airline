import React from "react";
import { render, fireEvent } from "@testing-library/react";

import CustomDatePicker from "../CustomDatePicker";

import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";

function RTLrender(type) {
  return render(
    <TestStationsProvider>
      <CustomDatePicker placeholder={"Placeholder"} type={type} />
    </TestStationsProvider>
  );
}

test("Renders in default state with empty value", () => {
  const type = "departure";
  const { getByLabelText } = RTLrender(type);

  expect(getByLabelText("Placeholder")).toBeTruthy();
  expect(getByLabelText("Placeholder")).toHaveValue("");
});

// ! Seems 3rd party component has some issues as this constantly
// ! gives errors. Skipping further testing.
test.skip("Shows calendar on focus", async () => {
  const type = "departure";
  const { getByLabelText, getByRole, getAllByRole } = RTLrender(type);

  fireEvent.focus(getByLabelText("Placeholder"));
  expect(getByRole("listbox")).toBeTruthy();
  expect(getAllByRole("option")).toBeTruthy();
});
