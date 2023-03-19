import React from "react";
import { vi, it, expect } from "vitest";
import {
  screen,
  renderWithContext,
  waitForElementToBeRemoved,
} from "../../../tests/test-utils";
import Address from "./Address";
import GetAddressWithSessionResponse from "../../../mocks/responses/GetAddressWithSession.json";
import type { IStoreContext } from "../../../services/store";

let storeProps: IStoreContext;

beforeEach(() => {
  storeProps = {
    sessionId: "12345678",
    cleanState: vi.fn(),
    setSessionId: vi.fn(),
  };
});

it("should render correctly", () => {
  const { asFragment } = renderWithContext(<Address />, { storeProps });
  expect(asFragment()).toMatchSnapshot();
});

it("should display the loading spinner", () => {
  renderWithContext(<Address />, { storeProps });
  expect(screen.getByTestId("loading-spinner")).toHaveTextContent("Loading...");
});

it("should display the emails", async () => {
  renderWithContext(<Address />, { storeProps });

  const addresses = GetAddressWithSessionResponse.session.addresses;

  await waitForElementToBeRemoved(screen.queryByText("Loading..."));

  addresses.forEach((address) => {
    expect(screen.getByText(address.address)).toBeDefined();
  });
});