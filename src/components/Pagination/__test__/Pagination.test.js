import { render, fireEvent, getByTestId } from "@testing-library/react";
import renderer from "react-test-renderer";
import Pagination from "../Pagination";

const setup = () => {
  const pagination = { currentPageNo: 3, totalPages: 5 };
  const handlePageChange = jest.fn();
  const { container } = render(
    <Pagination handlePageChange={handlePageChange} pagination={pagination} />
  );

  return {
    container,
    handlePageChange,
  };
};

test("clicking << takes us to the first page, if currentPage is not first page", () => {
  const { container, handlePageChange } = setup();
  fireEvent.click(getByTestId(container, 'getFirstPageBtn'));
  expect(handlePageChange).toHaveBeenCalledTimes(1);
});

test("clicking < takes us to the previous page, if currentPage is not first page", () => {
  const { container, handlePageChange } = setup();
  fireEvent.click(getByTestId(container, 'getPrevPageBtn'));
  expect(handlePageChange).toHaveBeenCalledTimes(1);
});

test("clicking > takes us to the next page, if currentPage is not last page", () => {
  const { container, handlePageChange } = setup();
  fireEvent.click(getByTestId(container, 'getNextPageBtn'));
  expect(handlePageChange).toHaveBeenCalledTimes(1);
});

test("clicking >> takes us to the next page, if currentPage is not last page", () => {
  const { container, handlePageChange } = setup();
  fireEvent.click(getByTestId(container, 'getLastPageBtn'));
  expect(handlePageChange).toHaveBeenCalledTimes(1);
});

it("renders a snapshot of Pagination Component", () => {
  const tree = renderer.create(<Pagination />).toJSON();
  expect(tree).toMatchSnapshot();
});
