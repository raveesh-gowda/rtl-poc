import React, { Component } from "react";

import Greet from "./Greet";
import User from "./User";

export default class Simple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			message: "Hello, User!",
			count: 0,
		};
	}

	changeMessage() {
		this.setState({
			message: "Thank you, User!",
		});
	}

	decrement() {
		this.setState((prevState) => ({ count: prevState.count - 1 }));
	}

	reset() {
		this.setState({ count: 0 });
	}

	increment() {
		this.setState((prevState) => ({ count: prevState.count + 1 }));
	}

	render() {
		const { message, count } = this.state;

		return (
			<>
				<h3>{message}</h3>
				<button onClick={() => this.changeMessage()}>Click Me</button>
				<hr />
				<h3>Count = {count}</h3>
				<button onClick={() => this.decrement()}>-</button>
				<button onClick={() => this.reset()}>reset</button>
				<button onClick={() => this.increment()}>+</button>
				<hr />
				<Greet name="Bruce Wayne" heroName="Batman" />
				<Greet name="Diana" heroName="Wonder Woman" />
				<hr />
				<User
					dummyUsers={[
						{ id: 1, name: "Max" },
						{ id: 2, name: "Jir" },
						{ id: 3, name: "Puk" },
					]}
				/>
			</>
		);
	}
}
