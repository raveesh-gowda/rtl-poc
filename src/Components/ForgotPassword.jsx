import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "./validate";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [formErrors, setFormErrors] = useState({});
	const errors = {};

	const navigate = useNavigate();

	const validations = () => {
		if (!validateEmail(email)) {
			errors.email = "Invalid email format";
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		validations();

		if (Object.keys(errors).length === 0) {
			setFormErrors({});

			const formData = {
				email,
			};
			console.log(formData);

			setEmail("");
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
				<input type="submit" value="Send" disabled={!email} />
			</form>
		</>
	);
};

export default ForgotPassword;
