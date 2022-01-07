import React from "react";
import ReactDom from "react-dom";
import Character from "./character";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<Character></Character>, div);
});
