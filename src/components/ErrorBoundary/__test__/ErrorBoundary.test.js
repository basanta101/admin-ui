import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorComponent from "../components/ErrorComponent";
import ErrorBoundary from "../ErrorBoundary";

beforeEach(() => {
    jest.spyOn(console, 'error');
    console.error.mockImplementation(() => {})
});

afterEach(() => {
    expect(console.error).toHaveBeenCalledTimes(2);
    console.error.mockRestore()
});

// a component is loaded which will throw error on mount.
it("reports the problem and renders Something went wrong.", () => {
  const logErrorToMyService = jest.fn();
  const { container } = render(
    <ErrorBoundary logErrorToMyService={logErrorToMyService}>
      <ErrorComponent />
    </ErrorBoundary>
  );
  const error = expect.any(Object);
  const info = expect.any(Object);
  expect(logErrorToMyService).toHaveBeenCalledWith(error, info);
  expect(container).toHaveTextContent("Something went wrong.");
});
