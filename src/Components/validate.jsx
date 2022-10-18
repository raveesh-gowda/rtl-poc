export const validateEmail = (email) => {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
	if (regex.test(email)) {
		return true;
	}
	return false;
};

export const validatePassword = (password) => {
	const regex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
	if (regex.test(password)) {
		return true;
	}
	return false;
};
