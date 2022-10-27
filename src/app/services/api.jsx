import axios from "axios";

const baseURL = "http://jsonplaceholder.typicode.com";

const client = axios.create({
	baseURL,
	headers: {
		"Content-Type": "application/json",
	},
});

const getAuthToken = () => {
	return localStorage.getItem("authToken");
};

client.interceptors.request.use(
	(config) => {
		config.headers = {
			...config.headers,
			Authorization: getAuthToken(),
		};
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const request = {
	get: (url, params, config) =>
		client
			.get(url, { params: params, ...config })
			.then((res) => res.data)
			.catch((err) => Promise.reject(err.response.data)),
	post: (url, data, config) =>
		client
			.post(url, data, config)
			.then((res) => res.data)
			.catch((err) => Promise.reject(err.response.data)),
	put: (url, data) =>
		client
			.put(url, data)
			.then((res) => res.data)
			.catch((err) => Promise.reject(err.response.data)),
	delete: (url, data) =>
		client
			.delete(url, { data: data })
			.then((res) => res.data)
			.catch((err) => Promise.reject(err.response.data)),
};

const Users = {
	getAll: () => request.get("/posts"),
	create: (formData) => request.post("/posts", formData),
	update: (id, formData) => request.put(`/posts/${id}`, formData),
	delete: (id) => request.delete(`/posts/${id}`),
};

export const api = {
	Users,
};
