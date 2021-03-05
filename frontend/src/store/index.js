import Vue from 'vue';
import Vuex from 'vuex';
import axiosAuth from '../service/axios.auth';
import axiosResource from './../service/axios.resource';
import createPersistedState from 'vuex-persistedstate';
import router from './../router';
Vue.use(Vuex);

export default new Vuex.Store({
	state: { accessToken: null },
	mutations: {
		Login(state, { accessToken }) {
			state.accessToken = accessToken;
		},
		Logout(state) {
			state.accessToken = null;
		},
		RefreshToken(state, { accessToken }) {
			state.accessToken = accessToken;
		},
	},
	actions: {
		async Login({ commit }, { id, password }) {
			const result = await axiosAuth.post('/user/authenticate', {
				id,
				password,
			});
			axiosAuth.defaults.headers.common = {
				Authorization: 'Bearer ' + result.data.result.accessToken,
			};
			axiosResource.defaults.headers.common = {
				Authorization: 'Bearer ' + result.data.result.accessToken,
			};
			return commit('Login', result.data.result);
		},
		async Logout({ commit }) {
			try {
				await axiosAuth.post('/user/revoke-token');
				// eslint-disable-next-line no-empty
			} catch (err) {}
			router.push('/login').catch(() => {});
			return commit('Logout');
		},
		RefreshToken({ commit }, { accessToken }) {
			return commit('RefreshToken', { accessToken });
		},
	},
	modules: {},
	plugins: [createPersistedState()],
});
