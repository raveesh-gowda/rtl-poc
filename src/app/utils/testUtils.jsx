import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

/*
Error: useHref() may be used only in the context of a <Router> component.
A common cause of the error is having your navigation links outside of the Router component. 
Make sure that all components in which you use links are nested inside of a Router.
*/

const Wrapper = ({ children }) => {
	return <BrowserRouter>{children}</BrowserRouter>;
};

const wrappedRender = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { wrappedRender as render };
