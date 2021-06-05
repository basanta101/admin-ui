import renderer from "react-test-renderer";
import Table from "../Table";

it("renders a snapshot of Pagination Component", () => {
  const tree = renderer.create(<Table />).toJSON();
  expect(tree).toMatchSnapshot();
});