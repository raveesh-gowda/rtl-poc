import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword } from "./validate";

const RegisterForm = () => {
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [agree, setAgree] = React.useState(false);
	const [formErrors, setFormErrors] = React.useState({});
	const errors = {};

	const validations = () => {
		if (firstName.trim().length === 0) {
			errors.firstName = "First Name is required";
		}
		if (lastName.trim().length === 0) {
			errors.lastName = "Last Name is required";
		}
		if (phone.trim().length === 0) {
			errors.phone = "Phone is required";
		}
		if (email.trim().length === 0) {
			errors.email = "Email is required";
		} else if (!validateEmail(email)) {
			errors.email = "Invalid email format";
		}
		if (password.trim().length === 0) {
			errors.password = "Password is required";
		} else if (!validatePassword(password)) {
			errors.password =
				"Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special";
		}
	};

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		validations();

		if (Object.keys(errors).length === 0) {
			setFormErrors({});

			const formData = {
				firstName,
				lastName,
				address,
				phone,
				email,
				password,
			};

			console.log(formData);
			navigate("/login");

			setFirstName("");
			setLastName("");
			setAddress("");
			setPhone("");
			setEmail("");
			setPassword("");
		} else {
			setFormErrors(errors);
		}
	};

	return (
		<>
			<h3>Register Here</h3>
			<form onSubmit={handleSubmit}>
				<label htmlFor="register-firstname">First Name</label>
				<br />
				<input
					id="register-firstname"
					type="text"
					value={firstName}
					onChange={(e) => {
						setFirstName(e.target.value);
					}}
					name="firstName"
					placeholder="First Name"
					autoComplete="off"
				/>
				{formErrors.firstName && <span style={{ color: "red" }}>{formErrors.firstName}</span>}
				<br />
				<label htmlFor="register-lastname">Last Name</label>
				<br />
				<input
					id="register-lastname"
					type="text"
					value={lastName}
					onChange={(e) => {
						setLastName(e.target.value);
					}}
					name="lastName"
					placeholder="Last Name"
					autoComplete="off"
				/>
				{formErrors.lastName && <span style={{ color: "red" }}>{formErrors.lastName}</span>}
				<br />
				<label htmlFor="register-address">Address</label>
				<br />
				<textarea
					id="register-address"
					type="text"
					value={address}
					onChange={(e) => {
						setAddress(e.target.value);
					}}
					name="address"
					placeholder="Address"
					autoComplete="off"
				/>
				<br />
				<label htmlFor="register-phone">Phone</label>
				<br />
				<input
					id="register-phone"
					type="text"
					value={phone}
					onChange={(e) => {
						setPhone(e.target.value);
					}}
					name="phone"
					placeholder="Phone"
					autoComplete="off"
				/>
				{formErrors.phone && <span style={{ color: "red" }}>{formErrors.phone}</span>}
				<br />
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
				<input
					id="agree"
					type="checkbox"
					value={agree}
					checked={agree}
					onChange={(e) => {
						setAgree(e.target.checked);
					}}
					name="agree"
				/>
				<label htmlFor="agree">I Agree to terms and conditions.</label>
				<br />
				<input type="submit" value="Register" disabled={!agree} />
			</form>
			<div style={{ marginTop: "10px" }}>
				<p>Already have an account?</p>
				<Link to="/login">Click Here</Link>
			</div>
		</>
	);
};

export default RegisterForm;
