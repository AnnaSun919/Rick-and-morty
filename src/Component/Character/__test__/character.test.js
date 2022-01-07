import { shallow, mount } from "enzyme";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Search from "../Search";
import SingleCharater from "../singleCharater";
import DropItem from "../../DropdownMenu/DropdownItem";
import Character from "../character";

configure({ adapter: new Adapter() });

const character = require("../character");

test("chracter exist", () => {
  expect(character).toBeDefined();
});

it("Components without crashing", () => {
  shallow(<SingleCharater />);
  shallow(<Search />);
  shallow(<DropItem />);
});

// it("renders Account header", () => {
//   const wrapper = shallow(<Character />);
//   const header = <img />;
//   expect(wrapper.contains(header)).toEqual(true);
// });
