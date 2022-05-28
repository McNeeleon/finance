import { httpUserInfo } from '../../axios/api';

import store from '../index';

export default {
	namespaced: true,

	state() {
		return {
			info: null,
		};
	},
	mutations: {
		setInfo(state, payload) {
			state.info = payload;
		},

		clearInfo(state) {
			state.info = null;
		},

		updateBill(state, payload) {
			state.info.bill = payload;
		},
	},

	actions: {
		async sendInfo({ commit }, userInfo) {
			const userId = store.getters['auth/userId'];
			const token = store.getters['auth/token'];

			try {
				await httpUserInfo.sendInfo(userId, token, userInfo);

				commit('setInfo', userInfo);
			} catch (error) {
				console.log(error);
			}
		},

		async loadInfo({ commit }) {
			const userId = store.getters['auth/userId'];
			const token = store.getters['auth/token'];

			try {
				const r = await httpUserInfo.loadInfo(userId, token);

				commit('setInfo', ...r);
			} catch (error) {
				console.log(error);
			}
		},

		async updateInfo({ commit, getters, dispatch }, newInfo) {
			const userId = store.getters['auth/userId'];
			const token = store.getters['auth/token'];

			try {
				await httpUserInfo.updateInfo(userId, getters.infoId, token, newInfo);

				commit('setInfo', { ...newInfo, id: getters.infoId });

				dispatch(
					'callMessage',
					{ type: 'message', key: 'changed' },
					{ root: true }
				);
			} catch (error) {
				dispatch(
					'callMessage',
					{ type: null, key: error.response.data.error },
					{ root: true }
				);
				throw error;
			}
		},

		async updateBill({ commit, getters }, newBill) {
			try {
				const userId = store.getters['auth/userId'];
				const token = store.getters['auth/token'];

				await httpUserInfo.updateBill(userId, getters.infoId, token, newBill);

				commit('updateBill', newBill);
			} catch {
				throw new Error();
			}
		},
	},
	getters: {
		info(state) {
			return state.info;
		},

		bill(_, getters) {
			return +getters.info.bill;
		},

		infoId(_, getters) {
			return getters.info.id;
		},
	},
};
