import React, { Component } from "react";

export default class Timer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			time: 0,
		};
	}

	tick() {
		this.setState((prevState) => ({
			time: prevState.time + 1,
		}));
	}

	componentDidMount() {
		this.interval = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	render() {
		const { time } = this.state;

		return (
			<div>
				<h3>Timer</h3>
				<p>Seconds: {time}</p>
			</div>
		);
	}
}
