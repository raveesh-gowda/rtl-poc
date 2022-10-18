import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders rtl poc", () => {
	render(<App />);
	
	const text = screen.getByText(/rtl poc/i);
	expect(text).toBeInTheDocument();
});
