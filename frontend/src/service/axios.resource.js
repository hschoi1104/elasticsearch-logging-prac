import axios from 'axios';
import { UserService } from './user.service';
import store from '../store/index';

const axiosResource = axios.create({
	baseURL:
		process.env.VUE_APP_NODE_ENV == 'dev'
			? 'http://localhost:3000/api/v1'
			: process.env.VUE_APP_RESOURCE_URL,
	withCredentials: true,
});

// Add a request interceptor
axiosResource.interceptors.request.use(
	async function(config) {
		// Do something before request is sent
		try {
			config.headers.common = {
				Authorization: 'Bearer ' + store.state.accessToken,
			};
			// eslint-disable-next-line no-empty
		} catch (err) {}
		return await config;
	},
	function(error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// Add a response interceptor
axiosResource.interceptors.response.use(
	function(response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	async function(error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		const result = error.config;
		if (error.response.status === 401 && result.retry != true) {
			result.retry = true;

			const res = await UserService.refreshToken();

			error.response.config.headers = {
				Authorization: 'Bearer ' + res.data.result.accessToken,
			};

			return await axiosResource(result);
		}
		return Promise.reject(error);
	},
);

export default axiosResource;
