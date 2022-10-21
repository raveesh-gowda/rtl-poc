import { Button, Modal, Form as BootstrapForm } from "react-bootstrap";
import { Formik, Field, Form as FormikForm, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddEditModal = (props) => {
	const { show, handleClose, mode, toggleUserModal, userData, handleCreateUser, handleUpdateUser } =
		props;

	const initialValues = {
		id: userData?.id,
		userId: userData?.userId,
		title: userData?.title ? userData?.title : "",
		body: userData?.body ? userData?.body : "",
	};

	const validationSchema = Yup.object({
		title: Yup.string().required("*Title is required!"),
		body: Yup.string().required("*Body is required!"),
	});

	const handleSubmit = (formValues) => {
		if (mode === "create") {
			handleCreateUser(formValues);
		} else {
			handleUpdateUser(formValues);
		}
	};

	return (
		<div>
			<Modal onHide={handleClose} show={show} scrollable centered backdrop="static" size="lg">
				<Modal.Header closeButton>
					{mode === "view" ? (
						<Modal.Title
							style={{
								fontFamily: "$roboto-regular",
								fontSize: "34px",
								lineHeight: "36px",
							}}
						>
							View Post
						</Modal.Title>
					) : mode === "create" ? (
						<Modal.Title
							style={{
								fontFamily: "$roboto-regular",
								fontSize: "34px",
								lineHeight: "36px",
							}}
						>
							Add Post
						</Modal.Title>
					) : (
						<Modal.Title
							style={{
								fontFamily: "$roboto-regular",
								fontSize: "34px",
								lineHeight: "36px",
							}}
						>
							Edit Post
						</Modal.Title>
					)}
				</Modal.Header>
				<Modal.Body>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<FormikForm id="my-form">
							<div className="m-2">
								<BootstrapForm.Label htmlFor="title">Title</BootstrapForm.Label>
								<br />
								<Field
									name="title"
									type="text"
									placeholder="Title"
									autoComplete="off"
									disabled={mode === "view"}
									style={{ width: "100%" }}
								/>
								<ErrorMessage name="title">
									{(msg) => <div style={{ color: "red" }}>{msg}</div>}
								</ErrorMessage>
							</div>
							<div className="m-2">
								<BootstrapForm.Label htmlFor="body">Body</BootstrapForm.Label>
								<br />
								<Field
									as="textarea"
									style={{ width: "100%", height: "150px" }}
									name="body"
									type="text"
									placeholder="Body"
									autoComplete="off"
									disabled={mode === "view"}
								/>
								<ErrorMessage name="body">
									{(msg) => <div style={{ color: "red" }}>{msg}</div>}
								</ErrorMessage>
							</div>
						</FormikForm>
					</Formik>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="outline-secondary" onClick={() => handleClose()}>
						Cancel
					</Button>
					{mode === "view" ? null : (
						<Button
							variant={mode === "edit" ? "outline-primary" : "outline-success"}
							form="my-form"
							type="submit"
						>
							{mode === "edit" ? "Save Changes" : "Save"}
						</Button>
					)}
					{mode === "view" && (
						<Button
							variant="outline-warning"
							onClick={() => toggleUserModal(true, "edit", userData)}
						>
							Edit
						</Button>
					)}
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default AddEditModal;
