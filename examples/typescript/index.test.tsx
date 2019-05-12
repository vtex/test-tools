import React from "react";
import { render } from "../../react";
import Component from "./index";

test("should render the example in TypeScript", () => {
  const { getByText } = render(<Component />);

  expect(getByText(/This is an example/)).toBeDefined();
});
