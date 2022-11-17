import React, { memo } from "react";

const Button = (props) => {
	const { children, handleClick } = props;

	console.log(children, "button is rendered");

	return (
		<div>
			<button onClick={handleClick}>{children}</button>
		</div>
	);
};

export default memo(Button);
