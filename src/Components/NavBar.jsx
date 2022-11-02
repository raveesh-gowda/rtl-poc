import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Index from "./CRUD/Index";
import Simple from "./ClassComponents/Simple";

const NavBar = () => {
	return (
		<>
			<Link to="/crud-example">CRUD Example</Link>{" "}
			<Link to="/class-components">Class Components</Link>
			<Routes>
				<Route path="/" element={<RegisterForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/crud-example" element={<Index />} />
				<Route path="/class-components" element={<Simple />} />
			</Routes>
		</>
	);
};

export default NavBar;
