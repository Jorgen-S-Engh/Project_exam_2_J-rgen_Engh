// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);

import { render, screen } from "@testing-library/react";
import Venues from "../../../components/Venues";

describe("Venues component", () => {
  test("renders Venues and checks for headline", async () => {
    render(<Venues />);
    const headlineElement = await screen.findByText(/Featured Venues/i);
    expect(headlineElement).toBeInTheDocument();
  });
});
