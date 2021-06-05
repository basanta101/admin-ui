import renderer from "react-test-renderer";
import TableHeader from "../TableHeader";

it("renders a snapshot", () => {
  const tree = renderer.create(<TableHeader />).toJSON();
  expect(tree).toMatchSnapshot();
});
