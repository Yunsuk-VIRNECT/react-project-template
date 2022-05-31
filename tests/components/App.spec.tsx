import { render, screen } from "@testing-library/react";

import App from "../../src/components/App";

test("renders main page correctly", () => {
  render(<App />);
  expect(true).toBeTruthy();
  expect(screen.getByText("test paragraph")).toBeVisible();
});
