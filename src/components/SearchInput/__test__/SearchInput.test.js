import renderer from "react-test-renderer";
import SearchInput from "../SearchInput";

it("renders a snapshot of Pagination Component", () => {
  const tree = renderer.create(<SearchInput />).toJSON();
  expect(tree).toMatchSnapshot();
});
