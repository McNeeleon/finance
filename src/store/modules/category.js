import store from '../index';

import { httpCategory } from '../../axios/api';

export default {
	namespaced: true,

	state() {
		return {
			category: [],
		};
	},

	mutations: {
		setCategory(state, payload) {
			state.category = payload;
		},

		addCategory(state, payload) {
			state.category.push(payload);
		},

		refresh(state, [cat, idx]) {
			state.category[idx] = cat;
		},
	},
	actions: {
		async sendCategory({ commit, dispatch }, category) {
			const token = store.getters['auth/token'];
			const userId = store.getters['auth/userId'];

			try {
				const data = await httpCategory.sendCategory(userId, token, category);

				commit('addCategory', { id: data.name, ...category });

				dispatch(
					'callMessage',
					{ type: 'message', key: 'added' },
					{ root: true }
				);
			} catch (error) {
				dispatch('callMessage', { type: null, key: error }, { root: true });
				console.log(error);
				throw error;
			}
		},

		async loadCategory({ commit, getters }) {
			const token = store.getters['auth/token'];
			const userId = store.getters['auth/userId'];

			if (getters.categories.length !== 0) {
				return false;
			}

			try {
				const data = await httpCategory.loadCategory(userId, token);

				commit('setCategory', data);
			} catch (error) {
				console.error(error);
				throw error;
			}
		},

		async updateCategory({ commit, dispatch }, [category, idx]) {
			const token = store.getters['auth/token'];
			const userId = store.getters['auth/userId'];

			try {
				await httpCategory.updateCategory(userId, idx, token, category);

				commit('refresh', [category, idx]);

				dispatch(
					'callMessage',
					{ type: 'message', key: 'changed' },
					{ root: true }
				);
			} catch (error) {
				dispatch('callMessage', { type: null, key: error }, { root: true });
				console.log(error);
				throw error;
			}
		},
	},
	getters: {
		categories(state) {
			return state.category;
		},
	},
};
