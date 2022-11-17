import React, { memo } from "react";

const Title = () => {
	console.log("Title is rendered");

	return (
		<div>
			<h1>Use Callback Hook</h1>
		</div>
	);
};

export default memo(Title);
