// import API mocking utilities from Mock Service Worker
import { rest } from "msw";
import { setupServer } from "msw/node";

// import react-testing methods
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// the component to test
import Login from "../Login";

// setting up server
const server = setupServer(
	rest.post(
		"apiUrl/login",
		[{ email: "raveesh@gmail.com", password: "Testing!@34" }],
		(req, res, ctx) => {
			return res(
				ctx.status(200),
				ctx.json({
					token: "abdb23231232jdsaWEDwdxaCDA",
					message: "Successfully logged in",
					status: "SUCCESS",
				})
			);
		}
	)
);

// establish API mocking before all tests
beforeAll(() => server.listen());

// reset any request handlers that are declared as a part of our tests
afterEach(() => server.resetHandlers());

// clean up once the tests are done
afterAll(() => server.close());

describe("tests on mocking login api url", () => {
	test("check on successfull login", async () => {
		render(<Login />);

		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByRole("button");

		userEvent.type(email, "raveesh@gmail.com");
		userEvent.type(password, "Testing!@34");

		expect(email.value).toMatch("raveesh@gmail.com");
		expect(password.value).toMatch("Testing!@34");

		userEvent.click(button);

		await waitFor(() => screen.findByRole("alert"));

		expect(screen.getByRole("alert")).toHaveTextContent("Successfully logged in");
	});

	test("check on sending invalid credentials for login", async () => {
		server.use(
			// override the initial request handler and reuse the server
			rest.post(
				"apiUrl/login",
				[{ email: "raveesh@gmail.com", password: "Testing!@34" }],
				(req, res, ctx) => {
					return res(
						ctx.status(401),
						ctx.json({
							message: "Invalid email/ password",
							status: "ERROR",
						})
					);
				}
			)
		);

		render(<Login />);

		const email = screen.getByLabelText("Email");
		const password = screen.getByLabelText("Password");
		const button = screen.getByRole("button");

		userEvent.type(email, "raveesh@gmail.com");
		userEvent.type(password, "secret1234");

		expect(email.value).toMatch("raveesh@gmail.com");
		expect(password.value).toMatch("secret1234");

		userEvent.click(button);

		await waitFor(() => screen.findByRole("alert"));

		expect(screen.getByRole("alert")).toHaveTextContent("Invalid email/ password");
	});
});
