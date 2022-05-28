import store from '../index';

import getCookie from '../../utils/getCookie';
import setCookie from '../../utils/setCookie';
import deleteCoocie from '../../utils/deleteCoocie';
import { HttpAccount } from '../../axios/api';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';
const USER_ID = 'userId';
const REGISTERED = 'registered';

const API_KEY = process.env.VUE_APP_FB_KEY;

export default {
	namespaced: true,

	state() {
		return {
			// accessToken: localStorage.getItem(ACCESS_TOKEN),
			accessToken: null,
			userId: localStorage.getItem(USER_ID),
			refreshToken: getCookie(REFRESH_TOKEN),
			registered: localStorage.getItem(REGISTERED),
		};
	},

	mutations: {
		setUserId(state, payload) {
			state.userId = payload;
			localStorage.setItem(USER_ID, payload);
		},

		setAccessToken(state, payload) {
			state.accessToken = payload;
			// localStorage.setItem(ACCESS_TOKEN, payload);
		},

		setRefreshToken(state, payload) {
			state.refreshToken = payload;

			setCookie(REFRESH_TOKEN, payload, {
				/* secure: true */ SameSite: 'strict',
			});
		},

		setRegistered(state, payload) {
			state.registered = payload;
			localStorage.setItem(REGISTERED, payload);
		},

		logout(state) {
			state.userId = null;
			state.accessToken = null;
			state.refreshToken = null;
			state.registered = null;

			localStorage.removeItem(ACCESS_TOKEN);
			localStorage.removeItem(USER_ID);
			localStorage.removeItem(REGISTERED);

			deleteCoocie(REFRESH_TOKEN);

			store.commit('info/clearInfo');
		},
	},

	actions: {
		async newUser({ commit, dispatch }, registrData) {
			try {
				const response = await HttpAccount.CtrateNewUser(API_KEY, registrData);

				commit('setAccessToken', response.idToken);
				commit('setRefreshToken', response.refreshToken);
				commit('setUserId', response.localId);
				commit('setRegistered', true);
			} catch (e) {
				dispatch(
					'callMessage',
					{ type: 'error', key: e.response.data.error.message },
					{ root: true }
				);
				console.log(e);
				throw e;
			}
		},

		async login({ commit, dispatch }, loginData) {
			try {
				const response = await HttpAccount.login(API_KEY, loginData);

				commit('setAccessToken', response.idToken);
				commit('setUserId', response.localId);
				commit('setRefreshToken', response.refreshToken);
				commit('setRegistered', response.registered);
			} catch (e) {
				console.dir(e);
				store.dispatch(
					'callMessage',
					{ type: 'error', key: e.response.data.error.message },
					{ root: true }
				);
				throw e;
			}
		},
	},
	getters: {
		token(state) {
			return state.accessToken;
		},

		userId(state) {
			return state.userId;
		},

		isAuthenticated(state) {
			return !!state.registered;
		},

		refreshToken(state) {
			return state.refreshToken;
		},
	},
};
