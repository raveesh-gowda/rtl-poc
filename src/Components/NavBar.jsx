import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Index from "./CRUD/Index";
import Simple from "./ClassComponents/Simple";
import DNDContainer from "./DND/DNDContainer";

const NavBar = () => {
	return (
		<>
			<Link to="/">Home</Link> <Link to="/crud-example">CRUD Example</Link>{" "}
			<Link to="/class-components">Class Components</Link>{" "}
			<Link to="/drag-and-drop">Drag & Drop</Link>
			<Routes>
				<Route path="/" element={<RegisterForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/crud-example" element={<Index />} />
				<Route path="/class-components" element={<Simple />} />
				<Route path="/drag-and-drop" element={<DNDContainer />} />
			</Routes>
		</>
	);
};

export default NavBar;
