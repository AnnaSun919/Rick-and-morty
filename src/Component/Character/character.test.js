import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import ReactDom from "react-dom";
import Character from "./character";

test("is true", () => {
  expect(true).toBe(true);
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDom.render(<Character></Character>, div);
});
