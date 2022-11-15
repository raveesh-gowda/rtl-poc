import React, { useState, useTransition } from "react";
import { Container } from "react-bootstrap";

import Names from "./data.json";

const Example = () => {
	const [query, setQuery] = useState("");
	const [inputValue, setInputValue] = useState("");
	const [isPending, startTransition] = useTransition();

	const handleQueryChange = (e) => {
		const {
			target: { value },
		} = e;

		setInputValue(value);
		startTransition(() => setQuery(value));
	};

	const filteredNames = Names.filter((ele) => {
		return (
			ele.firstName.toLowerCase().includes(query.toLowerCase()) ||
			ele.lastName.toLowerCase().includes(query.toLowerCase())
		);
	});

	return (
		<div>
			<h3>Use Transition Example</h3>
			<Container>
				<input type="text" value={inputValue} onChange={handleQueryChange} placeholder="Search" />
				{isPending ? (
					<p>Updating List...</p>
				) : (
					filteredNames.map((name) => (
						<p key={name.id}>
							{name.firstName} {name.lastName}
						</p>
					))
				)}
			</Container>
		</div>
	);
};

export default Example;
