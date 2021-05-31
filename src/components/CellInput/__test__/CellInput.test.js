import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import CellInput from "../CellInput";

test("change event is triggered when user inputs, and onBlur is called when user leaves the input field", () => {
  let value = "";
  const onChange = jest.fn((val) => {
    value = val;
  });
  const onBlur = jest.fn();
  const { container, rerender } = render(
    <CellInput onChange={onChange} onBlur={onBlur} />
  );
  const input = container.firstChild;
  fireEvent.change(input, { target: { value: "$23" } });
  fireEvent.blur(input);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(onBlur).toHaveBeenCalledTimes(1);
  rerender(<CellInput value={value} handleChange={onChange} />);
  expect(input.value).toBe("$23");
});
