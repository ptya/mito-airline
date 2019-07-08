import React from "react";
import { render, cleanup } from "@testing-library/react";

import TimetableHeader from "../TimetableHeader";
import TestStationsProvider from "components/providers/__mocks__/TestStationsProvider";

afterEach(() => {
  cleanup();
  console.error.mockClear();
});

console.error = jest.fn();

// initials
const outboundType = "outbound";
const inboundType = "inbound";
const originName = "Origin Name";
const destinationName = "Destination Name";

test("<TimetableHeader /> rendered in outbound type", async () => {
  const { getByTestId } = render(
    <TestStationsProvider
      state={{
        origin: { shortName: originName },
        destination: { shortName: destinationName }
      }}
    >
      <TimetableHeader type={outboundType} />
    </TestStationsProvider>
  );

  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId("tt-header").textContent).toBe("Outbound");
  expect(getByTestId("tt-info").textContent).toMatch(
    new RegExp(`^${originName}`)
  );
  expect(getByTestId("tt-info").textContent).toMatch(
    new RegExp(`${destinationName}$`)
  );
});

test("<TimetableHeader /> rendered in inbound type", async () => {
  const { getByTestId } = render(
    <TestStationsProvider
      state={{
        origin: { shortName: originName },
        destination: { shortName: destinationName }
      }}
    >
      <TimetableHeader type={inboundType} />
    </TestStationsProvider>
  );

  expect(console.error).not.toHaveBeenCalled();
  expect(getByTestId("tt-header").textContent).toBe("Inbound");
  expect(getByTestId("tt-info").textContent).toMatch(
    new RegExp(`^${destinationName}`)
  );
  expect(getByTestId("tt-info").textContent).toMatch(
    new RegExp(`${originName}$`)
  );
});
