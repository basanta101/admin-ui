import renderer from "react-test-renderer";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import TableOptions from "../TableOptions";

const setup = ({ isRowInEditMode = true } = {}) => {
  const handleRowDelBtnClick = jest.fn();
  const handleRowEditBtnClick = jest.fn();
  const onDone = jest.fn();
  const { container } = render(
    <TableOptions
      handleRowDelBtnClick={handleRowDelBtnClick}
      handleRowEditBtnClick={handleRowEditBtnClick}
      onDone={onDone}
      isRowInEditMode={isRowInEditMode}
    />
  );

  return {
    container,
    handleRowDelBtnClick,
    handleRowEditBtnClick,
    onDone,
  };
};

test("on clicking the X btn it calls the handleRowDelBtnClick", () => {
  const { container, handleRowDelBtnClick } = setup();
  fireEvent.click(getByTestId(container, 'delBtn'));
  expect(handleRowDelBtnClick).toHaveBeenCalledTimes(1);
});

test("on clicking the Edit btn it calls the handleRowEditBtnClick, when isRowInEditMode is false", () => {
  const { container, handleRowEditBtnClick } = setup({ isRowInEditMode: false});
  fireEvent.click(getByTestId(container, 'done_edit_Btn'));
  expect(handleRowEditBtnClick).toHaveBeenCalledTimes(1);
});

test("on clicking the Done btn it calls the onDone, when isRowInEditMode is true", () => {
  const { container, onDone } = setup({ isRowInEditMode: true});
  fireEvent.click(getByTestId(container, 'done_edit_Btn'));
  expect(onDone).toHaveBeenCalledTimes(1);
});

it("renders a snapshot of TableOptions Component", () => {
  const tree = renderer.create(<TableOptions />).toJSON();
  expect(tree).toMatchSnapshot();
});
