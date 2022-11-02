import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "./validate";

const ForgotPassword = () => {
	const [forgotPasswordInfo, setForgotPasswordInfo] = useState({ email: "" });
	const [formErrors, setFormErrors] = useState({});
	const errors = {};

	const navigate = useNavigate();

	const validations = () => {
		if (!validateEmail(forgotPasswordInfo.email)) {
			errors.email = "Invalid email format";
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		setForgotPasswordInfo({ ...forgotPasswordInfo, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		validations();

		const { email } = forgotPasswordInfo;

		if (Object.keys(errors).length === 0) {
			setFormErrors({});

			const formData = {
				email,
			};
			console.log(formData);

			setForgotPasswordInfo({ email: "" });
			navigate(-1);
		} else {
			setFormErrors(errors);
		}
	};

	return (
		<>
			<p>Enter you Email ID, we will send you a link to change your password.</p>
			<form onSubmit={handleSubmit}>
				<label htmlFor="forgot-email">Email</label>
				<br />
				<input
					id="forgot-email"
					type="text"
					value={forgotPasswordInfo.email}
					onChange={handleChange}
					name="email"
					placeholder="Email"
					autoComplete="off"
				/>
				{formErrors.email && <span style={{ color: "red" }}>{formErrors.email}</span>}
				<br />
				<input type="submit" value="Send" disabled={!forgotPasswordInfo.email} />
			</form>
		</>
	);
};

export default ForgotPassword;
