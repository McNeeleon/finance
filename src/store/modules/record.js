import store from '../index';

import { httpRecord } from '../../axios/api';

export default {
	namespaced: true,

	state() {
		return {
			records: [],
			recordById: [],
		};
	},

	mutations: {
		addRecords(state, record) {
			state.records = [...state.records, record];
		},

		setRecords(state, record) {
			state.records = record;
		},

		setRecordById(state, rec) {
			state.recordById = rec;
		},
	},

	actions: {
		async sendRecord({ commit, dispatch }, record) {
			const token = store.getters['auth/token'];
			const userId = store.getters['auth/userId'];

			try {
				await httpRecord.sendRecord(userId, token, record);

				commit('addRecords', record);
			} catch (error) {
				dispatch('callMessage', { type: '', key: error }, { root: true });
				console.log(error);
				throw error;
			}
		},

		async loadRecords({ commit, dispatch, getters }) {
			const token = store.getters['auth/token'];
			const userId = store.getters['auth/userId'];

			try {
				const data = await httpRecord.loadRecords(userId, token);

				commit('setRecords', data);
			} catch (error) {
				console.error(error);
				// throw error;
			}
		},
	},

	getters: {
		records(state) {
			return state.records;
		},
	},
};
