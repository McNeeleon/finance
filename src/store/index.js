import axios from 'axios';

import { createStore, createLogger } from 'vuex';
import auth from './modules/auth';
import info from './modules/info';
import category from './modules/category';
import record from './modules/record';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
	plugins.push(createLogger());
}

export default createStore({
	plugins,

	state: {
		currency: [],
		infoMessage: null,
	},
	mutations: {
		setCurrency(state, payload) {
			state.currency = payload;
		},

		setMessage(state, payload) {
			state.infoMessage = payload;
		},

		clearMessage(state) {
			state.infoMessage = null;
		},
	},
	actions: {
		async loadCurrency({ commit }) {
			const api = '8d3b7f8fcf630f22732a97e64c83c6be';

			const { data } = await axios.get(
				`http://api.currencylayer.com/live?access_key=${api}&currencies=USD,RUB,EUR`
			);

			const cur = {
				EUR: data.quotes.USDEUR,
				RUB: data.quotes.USDRUB,
				USD: data.quotes.USDUSD,
			};
			// console.log(state.currency);

			commit('setCurrency', {
				quotes: cur,
				timestamp: data.timestamp,
				base: data.source,
			});
		},

		async callMessage({ commit, getters }, payload) {
			if (getters.infoMessage) {
				commit('clearMessage');

				setTimeout(() => {
					commit('setMessage', payload);
				}, 0);

				return false;
			}
			commit('setMessage', payload);

			setTimeout(() => {
				commit('clearMessage');
			}, 10000);
		},
	},

	getters: {
		infoMessage(state) {
			return state.infoMessage;
		},

		currency(state) {
			return state.currency;
		},
	},

	modules: { auth, info, category, record },
});
