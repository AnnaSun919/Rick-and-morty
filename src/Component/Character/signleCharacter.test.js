import React from "react";
import ReactDom from "react-dom";
import SingleCharacter from "./singleCharacter";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<SingleCharacter></SingleCharacter>, div);
});
