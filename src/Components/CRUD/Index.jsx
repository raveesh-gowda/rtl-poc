import { useState, lazy, Suspense } from "react";
import { Button } from "react-bootstrap";

import { url, columns } from "./constants";
import AddEditModal from "./AddEditModal";
import { useFetch } from "../../CustomHooks/useFetch";

const List = lazy(() => import("./List"));

const Index = () => {
	const { loading, data, addData, updateData } = useFetch(url);

	const [userData, setUserData] = useState({ show: false, mode: "view", data: {} });

	const toggleUserModal = (value, mode, data = {}) => {
		setUserData({ show: value, mode, data: data });
	};

	const handleCreateUser = (formData) => {
		addData(formData);
		toggleUserModal(false);
	};

	const handleView = (rowData) => {
		const { original } = rowData;
		toggleUserModal(true, "view", original);
	};

	const handleUpdateUser = (formData) => {
		updateData(formData);
		toggleUserModal(false);
	};

	return (
		<div>
			<Button size="md" className="m-3" onClick={() => toggleUserModal(true, "create", {})}>
				Create Post
			</Button>
			<Suspense fallback={<h5>Loading...</h5>}>
				<List data={data} columns={columns} handleView={handleView} />
			</Suspense>
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
