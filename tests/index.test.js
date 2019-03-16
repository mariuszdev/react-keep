import React from "react";
import { render, cleanup } from "react-testing-library";

import withKeep from "../src/withKeep";

afterEach(cleanup);

const Counter = ({ label, number }) => (
  <div>
    <div data-testid="label">{label}</div>
    <div data-testid="number">{number}</div>
  </div>
);

it("Doesn't wrap component when list of props is not provided", () => {
  const CounterWithKeep = withKeep(Counter, undefined, () => {});

  expect(CounterWithKeep).toBe(Counter);
});

it("Doesn't wrap component when checking function is not provided", () => {
  const CounterWithKeep = withKeep(Counter, ["label"]);

  expect(CounterWithKeep).toBe(Counter);
});

it("Renders latest prop when checking function returns false", () => {
  const CounterWithKeep = withKeep(Counter, ["number"], () => false);
  const { getByTestId, rerender } = render(<CounterWithKeep label="Messages" number={1} />);

  rerender(<CounterWithKeep label="Messages" number={2} />);

  expect(getByTestId("number").textContent).toBe("2");
});

it("Renders kept prop when checking function returns true", () => {
  const CounterWithKeep = withKeep(Counter, ["number"], ({ number }) => number === 0);
  const { getByTestId, rerender } = render(<CounterWithKeep label="Messages" number={1} />);

  rerender(<CounterWithKeep label="Messages" number={0} />);

  expect(getByTestId("number").textContent).toBe("1");
});

it("Renders latest prop after being previously kept", () => {
  const CounterWithKeep = withKeep(Counter, ["number"], ({ number }) => number === 0);
  const { getByTestId, rerender } = render(<CounterWithKeep label="Messages" number={1} />);

  rerender(<CounterWithKeep label="Messages" number={0} />);

  rerender(<CounterWithKeep label="Messages" number={2} />);

  expect(getByTestId("number").textContent).toBe("2");
});

it("Renders kept prop and latest prop (not contained by props to keep list)", () => {
  const CounterWithKeep = withKeep(Counter, ["number"], ({ number }) => number === 0);
  const { getByTestId, rerender } = render(<CounterWithKeep label="Messages" number={1} />);

  rerender(<CounterWithKeep label="No messages" number={0} />);

  expect(getByTestId("number").textContent).toBe("1");
  expect(getByTestId("label").textContent).toBe("No messages");
});
