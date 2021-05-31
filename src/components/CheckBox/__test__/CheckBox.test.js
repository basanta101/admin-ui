import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CheckBox from "../CheckBox";
import "@testing-library/jest-dom";

test("user can check uncheck the checkBox", () => {
  let checked = false;
  const handleCheckCb = jest.fn((val) => {
    checked = val;
  });
  const { container, rerender } = render(
    <CheckBox handleCheckCb={handleCheckCb} checked={checked} />
  );
  const input = container.firstChild;
  fireEvent.click(input);
  expect(handleCheckCb).toHaveBeenCalledTimes(1);
  rerender(<CheckBox handleCheckCb={handleCheckCb} checked={checked} />);
  expect(input).toBeChecked();
});
