import axios from "axios";
import React, { Component } from "react";

export default class User extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showUsers: true,
			filteredUsers: this.props.dummyUsers,
			searchTerm: "",
			fetchedData: [],
		};
	}

	toggleUsersHandler() {
		this.setState((prevState) => ({
			showUsers: !prevState.showUsers,
		}));
	}

	componentDidMount() {
		axios
			.get("https://jsonplaceholder.typicode.com/users")
			.then((response) => {
				const { data } = response;
				this.setState({ fetchedData: data });
			})
			.catch((err) => console.log(err));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.searchTerm !== this.state.searchTerm) {
			this.setState({
				filteredUsers: this.props.dummyUsers.filter((ele) =>
					ele.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
				),
			});
		}
	}

	searchChangeHandler(e) {
		this.setState({ searchTerm: e.target.value });
	}

	render() {
		const { showUsers, filteredUsers, searchTerm, fetchedData } = this.state;

		return (
			<>
				<h3>Users</h3>
				<input type="text" value={searchTerm} onChange={this.searchChangeHandler.bind(this)} />
				<button onClick={this.toggleUsersHandler.bind(this)}>
					{showUsers ? "Hide" : "Show"} Users
				</button>
				{showUsers &&
					filteredUsers.map((ele) => {
						return <li key={ele.id}>{ele.name}</li>;
					})}
				<hr />
				{fetchedData.length && fetchedData.map((ele) => <li key={ele.id}>{ele.name}</li>)}
			</>
		);
	}
}
