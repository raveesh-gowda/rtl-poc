import { screen, render } from "../../utils/testUtils";
import userEvent from "@testing-library/user-event";

import Login from "../Login";

const renderComponent = () => {
	render(<Login />);
};

describe("testing on login component", () => {
	test("to check whether component is present", () => {
		renderComponent();
	});

	test("to check on header", () => {
		renderComponent();

		const header = screen.getByText("Login Page");
		expect(header).toBeInTheDocument();
	});

	test("to check on email and password fields are empty initially", () => {
		renderComponent();

		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByRole("button");

		expect(email).toHaveValue("");
		expect(password).toHaveValue("");
		expect(button).toHaveValue("Login");
		expect(button).toBeDisabled();
	});

	test("to check on email and password fields take invalid values", () => {
		renderComponent();

		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByRole("button");

		userEvent.type(email, "raveesh");
		userEvent.type(password, "Testing");

		expect(email.value).not.toMatch("raveesh@gmail.com");
		expect(password.value).not.toMatch("Testing!@34");

		userEvent.click(button);

		const emailError = screen.getByText("Invalid email format");
		const passwordError = screen.getByText(
			"Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
		);

		expect(emailError).toBeInTheDocument();
		expect(passwordError).toBeInTheDocument();
		expect(emailError).toHaveStyle({ color: "red" });
		expect(passwordError).toHaveStyle({ color: "red" });
	});

	test("to check on email and password fields take valid values", () => {
		renderComponent();

		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByRole("button");

		userEvent.type(email, "raveesh@gmail.com");
		userEvent.type(password, "Testing!@34");

		expect(email.value).toMatch("raveesh@gmail.com");
		expect(password.value).toMatch("Testing!@34");

		userEvent.click(button);
	});

	test("to check on links", () => {
		renderComponent();

		const link = screen.getAllByRole("link");
		expect(link).toHaveLength(2);
	});
});
