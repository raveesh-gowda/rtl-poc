import React from "react";
import { Route, Routes } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";

const NavBar = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<RegisterForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
			</Routes>
		</>
	);
};

export default NavBar;
