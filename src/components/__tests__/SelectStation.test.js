import React from "react";
import { render, fireEvent } from "@testing-library/react";

import SelectStation from "../SelectStation";

import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";
import { stations } from "components/providers/__mocks__/mockValues";

function RTLrender() {
  const context = render(
    <TestStationsProvider state={{ stations }}>
      <SelectStation placeholder={"Origin"} id={"origin"} stored={null} />
    </TestStationsProvider>
  );
  return context;
}

test("Renders without value and suggestions", () => {
  const { getByLabelText, queryByTestId } = RTLrender();
  expect(getByLabelText("Origin")).toBeTruthy();
  expect(getByLabelText("Origin")).toHaveValue("");
  expect(queryByTestId("suggestion")).toBeFalsy();
});

test("Suggestions appear based on input", () => {
  const {
    getByLabelText,
    getAllByTestId,
    getByTestId,
    queryByTestId
  } = RTLrender();

  expect(getByLabelText("Origin")).toBeTruthy();
  expect(getByLabelText("Origin")).toHaveValue("");
  expect(queryByTestId("suggestion")).toBeFalsy();

  fireEvent.focus(getByLabelText("Origin"));
  fireEvent.change(getByLabelText("Origin"), {
    target: {
      value: "B"
    }
  });

  expect(getAllByTestId("suggestion")).toHaveLength(2);

  fireEvent.change(getByLabelText("Origin"), {
    target: {
      value: "Bu"
    }
  });

  expect(getAllByTestId("suggestion")).toHaveLength(1);
  expect(getByTestId("suggestion").textContent).toBe("Budapest");

  fireEvent.change(getByLabelText("Origin"), {
    target: {
      value: "Bul"
    }
  });

  expect(queryByTestId("suggestion")).toBeFalsy();

  fireEvent.change(getByLabelText("Origin"), {
    target: {
      value: "Budapest"
    }
  });
  fireEvent.click(getByTestId("suggestion"));
  fireEvent.blur(getByLabelText("Origin"));

  expect(queryByTestId("suggestion")).toBeFalsy();
  expect(getByLabelText("Origin")).toHaveValue("Budapest");
});
