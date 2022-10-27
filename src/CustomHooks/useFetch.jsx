import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

export const useFetch = (url) => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const { addToast } = useToasts();

	const getData = useCallback(async () => {
		try {
			const { data } = await axios(url);
			setData(data);
			setLoading(false);
		} catch (error) {
			addToast(error.message, {
				appearance: "error",
				autoDismiss: true,
				autoDismissTimeout: 1000 * 3,
			});
		}
	}, [addToast, url]);

	useEffect(() => {
		getData();
	}, [getData, url]);

	const addData = async (formData) => {
		try {
			const { data: result } = await axios.post(url, formData);
			setData([result, ...data]);
			addToast("Successfuly created!", {
				appearance: "success",
				autoDismiss: true,
				autoDismissTimeout: 1000 * 3,
			});
		} catch (error) {
			addToast(error.message, {
				appearance: "error",
				autoDismiss: true,
				autoDismissTimeout: 1000 * 3,
			});
		}
	};

	const updateData = async (formData) => {
		try {
			const { data: result } = await axios.put(`${url}/${formData.id}`, formData);
			const updatedData = data.map((ele) => {
				if (ele.id === result.id) {
					return { ...result };
				} else {
					return { ...ele };
				}
			});
			setData(updatedData);
			addToast("Successfuly updated!", {
				appearance: "success",
				autoDismiss: true,
				autoDismissTimeout: 1000 * 3,
			});
		} catch (error) {
			addToast(error.message, {
				appearance: "error",
				autoDismiss: true,
				autoDismissTimeout: 1000 * 3,
			});
		}
	};

	return { loading, data, addData, updateData };
};
