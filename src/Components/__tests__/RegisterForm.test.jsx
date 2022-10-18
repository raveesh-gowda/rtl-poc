import { screen, render } from "../../utils/testUtils";
import userEvent from "@testing-library/user-event";

import RegisterForm from "../RegisterForm";

const renderComponent = () => {
	render(<RegisterForm />);
};

describe("tests on register form component", () => {
	test("to check whether component is present", () => {
		renderComponent();
	});

	test("to check on header", () => {
		renderComponent();

		const header = screen.getByText("Register Here");
		expect(header).toBeInTheDocument();
	});

	test("to check whether all the fields are initially empty", () => {
		renderComponent();

		const firstName = screen.getByLabelText("First Name");
		const lastName = screen.getByLabelText("Last Name");
		const address = screen.getByLabelText("Address");
		const phone = screen.getByLabelText("Phone");
		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const agree = screen.getByRole("checkbox");
		const button = screen.getByRole("button");

		expect(firstName).toHaveValue("");
		expect(lastName).toHaveValue("");
		expect(address).toHaveValue("");
		expect(phone).toHaveValue("");
		expect(email).toHaveValue("");
		expect(password).toHaveValue("");
		expect(agree).not.toBeChecked();
		expect(button).toHaveValue("Register");
		expect(button).toBeDisabled();
	});

	test("to check whether all the fields are initially empty, agree is checked and errors are shown", () => {
		renderComponent();

		const agree = screen.getByRole("checkbox");
		const button = screen.getByRole("button");

		userEvent.click(agree);

		expect(agree).toBeChecked();
		expect(button).toBeEnabled();

		userEvent.click(button);

		const firstNameError = screen.getByText("First Name is required");
		const lastNameError = screen.getByText("Last Name is required");
		const phoneError = screen.getByText("Phone is required");
		const emailError = screen.getByText("Email is required");
		const passwordError = screen.getByText("Password is required");

		expect(firstNameError).toBeInTheDocument();
		expect(lastNameError).toBeInTheDocument();
		expect(phoneError).toBeInTheDocument();
		expect(emailError).toBeInTheDocument();
		expect(passwordError).toBeInTheDocument();
	});

	test("to check whether all the fields are initially empty, agree is checked and validation errors are shown", () => {
		renderComponent();

		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");

		userEvent.type(email, "raveesh");
		userEvent.type(password, "Testing");

		const agree = screen.getByRole("checkbox");
		const button = screen.getByRole("button");

		userEvent.click(agree);

		expect(agree).toBeChecked();
		expect(button).toBeEnabled();

		userEvent.click(button);

		const firstNameError = screen.getByText("First Name is required");
		const lastNameError = screen.getByText("Last Name is required");
		const emailError = screen.getByText("Invalid email format");
		const passwordError = screen.getByText(
			"Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
		);

		expect(firstNameError).toBeInTheDocument();
		expect(lastNameError).toBeInTheDocument();
		expect(emailError).toBeInTheDocument();
		expect(passwordError).toBeInTheDocument();
	});

	test("to check whether all the fields take values", () => {
		renderComponent();

		const firstName = screen.getByLabelText("First Name");
		const lastName = screen.getByLabelText("Last Name");
		const address = screen.getByLabelText("Address");
		const phone = screen.getByLabelText("Phone");
		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const agree = screen.getByRole("checkbox");

		userEvent.type(firstName, "raveesh");
		userEvent.type(lastName, "gowda");
		userEvent.type(address, "#26-A, GJK, Bangalore");
		userEvent.type(phone, "9988776655");
		userEvent.type(email, "raveesh@gmail.com");
		userEvent.type(password, "Testing!@34");
		userEvent.click(agree);

		expect(firstName).toHaveValue("raveesh");
		expect(lastName).toHaveValue("gowda");
		expect(address).toHaveValue("#26-A, GJK, Bangalore");
		expect(phone).toHaveValue("9988776655");
		expect(email).toHaveValue();
		expect(password).toHaveValue("Testing!@34");
		expect(agree).toBeChecked();
	});

	test("to check whether all values are taken and button is clicked", () => {
		renderComponent();

		const firstName = screen.getByLabelText("First Name");
		const lastName = screen.getByLabelText("Last Name");
		const address = screen.getByLabelText("Address");
		const phone = screen.getByLabelText("Phone");
		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const agree = screen.getByRole("checkbox");
		const button = screen.getByRole("button", { name: "Register" });

		userEvent.type(firstName, "raveesh");
		userEvent.type(lastName, "gowda");
		userEvent.type(address, "#26-A, GJK, Bangalore");
		userEvent.type(phone, "9988776655");
		userEvent.type(email, "raveesh@gmail.com");
		userEvent.type(password, "Testing!@34");
		userEvent.click(agree);
		userEvent.click(button);
	});

	test("to check on links", () => {
		renderComponent();

		const link = screen.getAllByRole("link");
		expect(link).toHaveLength(1);
	});
});
