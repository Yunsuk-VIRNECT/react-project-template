import { render } from "@testing-library/react";

import Test from "../../src/components/Test";

test("renders test correctly", () => {
  render(<Test />);
  expect(true).toBeTruthy();
});
