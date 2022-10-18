import { validateEmail, validatePassword } from "../validate";

describe("tests on validate function", () => {
	test("to check on the invalid email", () => {
		expect(validateEmail("raveesh")).toBe(false);
		expect(validateEmail("raveesh.com")).toBe(false);
	});

	test("to check on the valid email", () => {
		expect(validateEmail("raveesh@gmail.com")).toBe(true);
	});

	test("to check on the invalid password", () => {
		expect(validatePassword("tfedu342")).toBe(false);
	});

	test("to check on the valid password", () => {
		expect(validatePassword("Testing!@34")).toBe(true);
	});
});
