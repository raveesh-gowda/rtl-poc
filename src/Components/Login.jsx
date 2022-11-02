import React, { useState } from "react";
import { Link } from "react-router-dom";

import { validateEmail, validatePassword } from "./validate";

const Login = () => {
	const [loginInfo, setLoginInfo] = useState({
		email: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const errors = {};

	const validations = () => {
		if (!validateEmail(loginInfo.email)) {
			errors.email = "Invalid email format";
		}
		if (!validatePassword(loginInfo.password)) {
			errors.password =
				"Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special";
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setLoginInfo({ ...loginInfo, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		validations();

		const { email, password } = loginInfo;

		if (Object.keys(errors).length === 0) {
			setFormErrors({});

			const formData = {
				email,
				password,
			};
			console.log(formData);

			setLoginInfo({ email: "", password: "" });
		} else {
			setFormErrors(errors);
		}
	};

	return (
		<>
			<h3>Login Page</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="login-email">Email</label>
				<br />
				<input
					id="login-email"
					type="text"
					value={loginInfo.email}
					onChange={handleChange}
					name="email"
					placeholder="Email"
					autoComplete="off"
				/>
				{formErrors.email && <span style={{ color: "red" }}>{formErrors.email}</span>}
				<br />
				<label htmlFor="login-password">Password</label>
				<br />
				<input
					id="login-password"
					type="password"
					value={loginInfo.password}
					onChange={handleChange}
					name="password"
					placeholder="Password"
					autoComplete="off"
				/>
				{formErrors.password && <span style={{ color: "red" }}>{formErrors.password}</span>}
				<br />
				<input type="submit" value="Login" disabled={!loginInfo.email || !loginInfo.password} />
			</form>
			<div>
				<p>Do not have an account?</p>
				<Link to="/">Click Here</Link>
			</div>
			<div style={{ marginTop: "10px" }}>
				<Link to="/forgot-password">Forgot Password</Link>
			</div>
		</>
	);
};

export default Login;
