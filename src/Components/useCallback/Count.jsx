import React, { memo } from "react";

const Count = (props) => {
	const { text, count } = props;

	console.log(text, "is rendered");

	return (
		<div>
			<h3>
				{text} - {count}
			</h3>
		</div>
	);
};

export default memo(Count);
