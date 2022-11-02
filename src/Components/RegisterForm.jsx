import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { validateEmail, validatePassword } from "./validate";

const RegisterForm = () => {
	const [registerInfo, setRegisterInfo] = useState({
		firstName: "",
		lastName: "",
		address: "",
		phone: "",
		email: "",
		password: "",
		agree: false,
	});

	const [formErrors, setFormErrors] = React.useState({});
	const errors = {};

	const validations = () => {
		if (registerInfo.firstName.trim().length === 0) {
			errors.firstName = "First Name is required";
		}
		if (registerInfo.lastName.trim().length === 0) {
			errors.lastName = "Last Name is required";
		}
		if (registerInfo.phone.trim().length === 0) {
			errors.phone = "Phone is required";
		}
		if (registerInfo.email.trim().length === 0) {
			errors.email = "Email is required";
		} else if (!validateEmail(registerInfo.email)) {
			errors.email = "Invalid email format";
		}
		if (registerInfo.password.trim().length === 0) {
			errors.password = "Password is required";
		} else if (!validatePassword(registerInfo.password)) {
			errors.password =
				"Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special";
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setRegisterInfo({
			...registerInfo,
			[name]: value,
		});
	};

	const handleCheckedChange = (e) => {
		const { name, checked } = e.target;

		setRegisterInfo({
			...registerInfo,
			[name]: checked,
		});
	};

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		validations();

		const { firstName, lastName, address, phone, email, password, agree } = registerInfo;

		if (Object.keys(errors).length === 0) {
			setFormErrors({});

			const formData = {
				firstName,
				lastName,
				address,
				phone,
				email,
				password,
				agree,
			};

			console.log(formData);
			navigate("/login");

			setRegisterInfo({
				firstName: "",
				lastName: "",
				address: "",
				phone: "",
				email: "",
				password: "",
				agree: false,
			});
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
					value={registerInfo.firstName}
					name="firstName"
					placeholder="First Name"
					autoComplete="off"
					onChange={handleChange}
				/>
				{formErrors.firstName && <span style={{ color: "red" }}>{formErrors.firstName}</span>}
				<br />
				<label htmlFor="register-lastname">Last Name</label>
				<br />
				<input
					id="register-lastname"
					type="text"
					value={registerInfo.lastName}
					name="lastName"
					placeholder="Last Name"
					autoComplete="off"
					onChange={handleChange}
				/>
				{formErrors.lastName && <span style={{ color: "red" }}>{formErrors.lastName}</span>}
				<br />
				<label htmlFor="register-address">Address</label>
				<br />
				<textarea
					id="register-address"
					type="text"
					value={registerInfo.address}
					name="address"
					placeholder="Address"
					autoComplete="off"
					onChange={handleChange}
				/>
				<br />
				<label htmlFor="register-phone">Phone</label>
				<br />
				<input
					id="register-phone"
					type="text"
					value={registerInfo.phone}
					name="phone"
					placeholder="Phone"
					autoComplete="off"
					onChange={handleChange}
				/>
				{formErrors.phone && <span style={{ color: "red" }}>{formErrors.phone}</span>}
				<br />
				<label htmlFor="login-email">Email</label>
				<br />
				<input
					id="login-email"
					type="text"
					value={registerInfo.email}
					name="email"
					placeholder="Email"
					autoComplete="off"
					onChange={handleChange}
				/>
				{formErrors.email && <span style={{ color: "red" }}>{formErrors.email}</span>}
				<br />
				<label htmlFor="login-password">Password</label>
				<br />
				<input
					id="login-password"
					type="password"
					value={registerInfo.password}
					name="password"
					placeholder="Password"
					autoComplete="off"
					onChange={handleChange}
				/>
				{formErrors.password && <span style={{ color: "red" }}>{formErrors.password}</span>}
				<br />
				<input
					id="agree"
					type="checkbox"
					value={registerInfo.agree}
					checked={registerInfo.agree}
					name="agree"
					onChange={handleCheckedChange}
				/>
				<label htmlFor="agree">I Agree to terms and conditions.</label>
				<br />
				<input type="submit" value="Register" disabled={!registerInfo.agree} />
			</form>
			<div style={{ marginTop: "10px" }}>
				<p>Already have an account?</p>
				<Link to="/login">Click Here</Link>
			</div>
		</>
	);
};

export default RegisterForm;
