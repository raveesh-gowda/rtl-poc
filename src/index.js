import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import App from "./App";
import { ToastProvider } from "react-toast-notifications";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<ToastProvider placement="top-center">
		<App />
	</ToastProvider>
);
