import axios from './Axios';

const checkAvailability = async (data) => {
	return new Promise (async (resolve, reject) => {
		try {
			const response = await axios.post('/users/checkAvailability', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const register = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/register', data);
			resolve(response.data);
		} catch (error) {
			reject(error); 
		}
	});
};

const login = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/login', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const changeLoginStatus = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/users/changeStatus', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const createRoom = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/rooms/new', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const joinRoom = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/rooms/join', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const leaveRoom = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/rooms/leave', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const getRooms = async () => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get('/rooms');
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const deleteRoom = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/rooms/delete', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const getMessages = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post('/messages', data);
			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
};

const chatHttp = {
	checkAvailability,
	changeLoginStatus,
	register,
	login,
	createRoom,
	joinRoom,
	leaveRoom,
	getRooms,
	getMessages,
	deleteRoom
};

export default chatHttp;
