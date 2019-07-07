import React from "react";
import { render, cleanup } from "@testing-library/react";

import TimetableHeader from "../TimetableHeader";
import { StationsContext } from "components/providers/StationsProvider";

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
    <StationsContext.Provider
      value={{
        stations: {
          origin: { shortName: originName },
          destination: { shortName: destinationName }
        }
      }}
    >
      <TimetableHeader type={outboundType} />
    </StationsContext.Provider>
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
    <StationsContext.Provider
      value={{
        stations: {
          origin: { shortName: originName },
          destination: { shortName: destinationName }
        }
      }}
    >
      <TimetableHeader type={inboundType} />
    </StationsContext.Provider>
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
