import { screen, render } from "../../utils/testUtils";
import userEvent from "@testing-library/user-event";

import ForgotPassword from "../ForgotPassword";

/*
Error: Cannot mock useNavigate() in jest; navigate is not a function
Solution: You should use the mockedNavigator somewhere in your mocked react-router-dom module. 
Also, the return value of the useNavigate() hook should be the navigate function itself, not an object with { navigate: ... } shape.
*/

// const mockedUsedNavigate = jest.fn();

// jest.mock("react-router-dom", () => ({
//   ...jest.requireActual("react-router-dom"),
//   useNavigate: () => mockedUsedNavigate,
// }));

const renderComponent = () => {
	render(<ForgotPassword />);
};

describe("testing on forgot password component", () => {
	test("to check whether component is present", () => {
		renderComponent();
	});

	test("to check on the paragraph tag", () => {
		renderComponent();

		const paragraph = screen.getByText("Enter you Email ID, we will send you a link to change your password.");
		expect(paragraph).toBeInTheDocument();
	});

	test("to check on the email input", () => {
		renderComponent();

		const email = screen.getByLabelText("Email");
		expect(email).toBeInTheDocument();
	});

	test("to check on the email input has initially empty value and button is disabled", () => {
		renderComponent();

		const email = screen.getByLabelText("Email");
		expect(email.value).toBe("");

		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	test("to check on email takes invalid email", () => {
		renderComponent();

		const email = screen.getByLabelText("Email");
		const button = screen.getByRole("button");

		userEvent.clear(email);
		userEvent.type(email, "raveesh");
		expect(email.value).not.toMatch("raveesh@gmail.com");

		userEvent.click(button);

		const error = screen.getByText("Invalid email format");
		expect(error).toBeInTheDocument();
		expect(error).toHaveStyle({ color: "red" });
	});

	test("to check on email takes valid email", () => {
		renderComponent();

		const email = screen.getByLabelText("Email");
		const button = screen.getByRole("button");

		userEvent.clear(email);
		userEvent.type(email, "raveesh@gmail.com");

		expect(email.value).toMatch("raveesh@gmail.com");

		userEvent.click(button);
	});
});

// For Demo
/*
const onSubmit = jest.fn();

test("passes through on submit function", () => {
	renderComponent(onSubmit);

	const data = {
		email: "raveeesh@gmail.com",
	};

	const email = screen.getByLabelText("Email");
	const button = screen.getByRole("button");

	userEvent.clear(email);
	userEvent.type(email, "raveesh@gmail.com");

	expect(email.value).toMatch("raveesh@gmail.com");

	userEvent.click(button);

	expect(onSubmit).toHaveBeenCalledWith(data);
});
*/
