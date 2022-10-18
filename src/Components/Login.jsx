import React from "react";
import { Link } from "react-router-dom";

import { validateEmail, validatePassword } from "./validate";

const Login = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [formErrors, setFormErrors] = React.useState({});
	const errors = {};

	const validations = () => {
		if (!validateEmail(email)) {
			errors.email = "Invalid email format";
		}
		if (!validatePassword(password)) {
			errors.password =
				"Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special";
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		validations();

		if (Object.keys(errors).length === 0) {
			setFormErrors({});

			const formData = {
				email,
				password,
			};
			console.log(formData);

			setEmail("");
			setPassword("");
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
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
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
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					name="password"
					placeholder="Password"
					autoComplete="off"
				/>
				{formErrors.password && <span style={{ color: "red" }}>{formErrors.password}</span>}
				<br />
				<input type="submit" value="Login" disabled={!email || !password} />
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
