import axios from "axios";
import { useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { Button } from "react-bootstrap";

import { url, columns } from "./constants";
import List from "./List";
import AddEditModal from "./AddEditModal";

const Index = () => {
	const { addToast } = useToasts();

	const [data, setData] = useState([]);
	const [userData, setUserData] = useState({ show: false, mode: "view", data: {} });

	useEffect(() => {
		axios
			.get(url)
			.then((response) => setData(response.data))
			.catch((err) =>
				addToast(err.message, {
					appearance: "error",
					autoDismiss: true,
					autoDismissTimeout: 1000 * 3,
				})
			);
	}, [addToast]);

	const toggleUserModal = (value, mode, data = {}) => {
		setUserData({ show: value, mode, data: data });
	};

	const handleCreateUser = (formData) => {
		axios
			.post(url, formData)
			.then((res) => {
				setData([res.data, ...data]);
				addToast("Successfuly created!", {
					appearance: "success",
					autoDismiss: true,
					autoDismissTimeout: 1000 * 3,
				});
			})
			.catch((err) =>
				addToast(err.message, {
					appearance: "error",
					autoDismiss: true,
					autoDismissTimeout: 1000 * 3,
				})
			);
		toggleUserModal(false);
	};

	const handleView = (rowData) => {
		const { original } = rowData;
		toggleUserModal(true, "view", original);
	};

	const handleUpdateUser = (formValues) => {
		axios
			.put(`${url}/${formValues.id}`, formValues)
			.then((response) => {
				console.log(response.data)
				const result = data.map((ele) => {
					if (ele.id === response.data.id) {
						return { ...response.data };
					} else {
						return { ...ele };
					}
				});
				setData(result);
				addToast("Successfuly updated!", {
					appearance: "success",
					autoDismiss: true,
					autoDismissTimeout: 1000 * 3,
				});
			})
			.catch((err) =>
				addToast(err.message, {
					appearance: "error",
					autoDismiss: true,
					autoDismissTimeout: 1000 * 3,
				})
			);
		toggleUserModal(false);
	};

	return (
		<div>
			<Button size="md" className="m-3" onClick={() => toggleUserModal(true, "create", {})}>
				Create Post
			</Button>
			<List data={data} columns={columns} handleView={handleView} />
			<AddEditModal
				show={userData.show || false}
				mode={userData.mode || "view"}
				toggleUserModal={toggleUserModal}
				handleClose={() => toggleUserModal(false)}
				userData={userData.data}
				handleCreateUser={handleCreateUser}
				handleUpdateUser={handleUpdateUser}
			/>
		</div>
	);
};

export default Index;
