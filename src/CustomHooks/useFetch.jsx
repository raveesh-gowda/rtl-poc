import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

export const useFetch = (url) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const { addToast } = useToasts();

	const getData = useCallback(async () => {
		await axios
			.get(url)
			.then((response) => {
				setData(response.data);
				setLoading(false);
			})
			.catch((err) =>
				addToast(err.message, {
					appearance: "error",
					autoDismiss: true,
					autoDismissTimeout: 1000 * 3,
				})
			);
	}, [addToast, url]);

	useEffect(() => {
		getData();
	}, [getData, url]);

	const addData = async (formData) => {
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
	};

	const updateData = async (formData) => {
		axios
			.put(`${url}/${formData.id}`, formData)
			.then((response) => {
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
	};

	return { loading, data, addData, updateData };
};
