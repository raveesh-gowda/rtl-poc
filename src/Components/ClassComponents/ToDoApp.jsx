import React, { Component } from "react";

export default class TodoApp extends Component {
	constructor(props) {
		super(props);

		this.state = { items: [], text: "" };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({ text: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		if (this.state.text.length === 0) {
			return;
		}

		const newItem = {
			text: this.state.text,
			id: Date.now(),
		};

		this.setState((state) => ({
			items: [newItem, ...state.items],
			text: "",
		}));
	}

	render() {
		const { items = [], text = "" } = this.state;

		const { handleChange, handleSubmit } = this;

		return (
			<div>
				<h3>TODO</h3>
				<form onSubmit={handleSubmit}>
					<label htmlFor="new-todo">What needs to be done?</label>
					<br />
					<input id="new-todo" onChange={handleChange} value={text} autoComplete="off" />
					<br />
					<button>Add #{items.length + 1}</button>
				</form>
				<TodoList items={items} />
			</div>
		);
	}
}

class TodoList extends React.Component {
	render() {
		return (
			<ul>
				{this.props.items.map((item) => (
					<li key={item.id}>{item.text}</li>
				))}
			</ul>
		);
	}
}
