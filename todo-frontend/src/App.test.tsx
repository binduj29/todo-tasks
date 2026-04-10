import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Todo Tasks header", () => {
  render(<App />);
  const heading = screen.getByText(/Todo Tasks/i);
  expect(heading).toBeInTheDocument();
});
