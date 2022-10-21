import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Index from "./CRUD/Index";

const NavBar = () => {
	return (
		<>
			<Link to="/crud-example">CRUD Example</Link>
			<Routes>
				<Route path="/" element={<RegisterForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/crud-example" element={<Index />} />
			</Routes>
		</>
	);
};

export default NavBar;
