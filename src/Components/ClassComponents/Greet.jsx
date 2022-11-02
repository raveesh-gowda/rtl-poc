import React, { Component } from "react";

export default class Greet extends Component {
	render() {
		const { name, heroName } = this.props;

		return (
			<>
				<h3>
					Hello {name}, a.k.a {heroName}
				</h3>
			</>
		);
	}
}
