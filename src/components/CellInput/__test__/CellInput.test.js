import React from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import CellInput from "../CellInput";

test("change event is triggered when user inputs", () => {
  let value = "";
  const onChange = jest.fn((val) => {
    value = val;
  });
  const { container, rerender } = render(
    <CellInput onChange={onChange} value={value}/>
  );
  const input = container.firstChild;
  fireEvent.change(input, { target: { value: "$23" } });
  expect(onChange).toHaveBeenCalledTimes(1);
  rerender(<CellInput value={value} handleChange={onChange} />);
  expect(input.value).toBe("$23");
});

test("onBlur is called when user leaves the input field", () => {
  const onBlur = jest.fn();
  const { container } = render(
    <CellInput onBlur={onBlur} />
  );
  const input = container.firstChild;
  fireEvent.blur(input);
  expect(onBlur).toHaveBeenCalledTimes(1);
});

it("renders a snapshot of CellInput", () => {
  const tree = renderer.create(<CellInput />).toJSON();
  expect(tree).toMatchSnapshot();
});