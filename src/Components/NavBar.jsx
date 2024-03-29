import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import RegisterForm from "./RegisterForm";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import Index from "./CRUD/Index";
import Simple from "./ClassComponents/Simple";
import DNDContainer from "./DND/DNDContainer";
import Example from "./useTransition/Example";
import Container from "./useCallback/Container";
import MemoContainer from "./useMemo/MemoContainer";

const NavBar = () => {
	return (
		<>
			<Link to="/">Home</Link> <Link to="/crud-example">CRUD Example</Link>{" "}
			<Link to="/class-components">Class Components</Link>{" "}
			<Link to="/drag-and-drop">Drag & Drop</Link>{" "}
			<Link to="/use-transition">useTransition Hook</Link>{" "}
			<Link to="/use-callback">useCallback Hook</Link> <Link to="/use-memo">useMemo Hook</Link>{" "}
			<Routes>
				<Route path="/" element={<RegisterForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/crud-example" element={<Index />} />
				<Route path="/class-components" element={<Simple />} />
				<Route path="/drag-and-drop" element={<DNDContainer />} />
				<Route path="/use-transition" element={<Example />} />
				<Route path="/use-callback" element={<Container />} />
				<Route path="/use-memo" element={<MemoContainer />} />
			</Routes>
		</>
	);
};

export default NavBar;
