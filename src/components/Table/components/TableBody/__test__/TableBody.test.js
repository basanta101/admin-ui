import renderer from "react-test-renderer";
import TableBody from "../TableBody";

it("renders a snapshot", () => {
  const tree = renderer.create(<TableBody />).toJSON();
  expect(tree).toMatchSnapshot();
});
