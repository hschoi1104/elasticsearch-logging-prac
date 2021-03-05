import axiosAuth from './axios.auth';
import store from './../store/index';
export class UserService {
	static refreshToken = async () => {
		try {
			const result = await axiosAuth.post('/user/refresh-token');
			await store.commit('RefreshToken', result.data.result);
			return result;
		} catch (err) {
			return err;
		}
	};
	static getUsers = async () => {
		try {
			const result = await axiosAuth.get('/user');
			return result.data.result;
		} catch (err) {
			return err;
		}
	};
}
