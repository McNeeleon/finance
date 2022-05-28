import axios from 'axios';
// import router from '../router';
import store from '../store';
import { HttpAccount } from './api';
// import { HttpAccount } from './api';

import config from './config';

const API_KEY = process.env.VUE_APP_FB_KEY;

const baseCfg = config.baseURL(process.env.VUE_APP_FB_URL);
const baseAxios = axios.create(baseCfg);

const accountCfg = config.baseURL(process.env.VUE_APP_FB_ACCOUNT);
const accountAxios = axios.create(accountCfg);

const tokenCfg = config.baseURL(process.env.VUE_APP_FB_TOKEN);
const tokenAxios = axios.create(tokenCfg);

// config.baseURL = process.env.VUE_APP_FB_ACCOUNT;

// const newAx = axios.create(config);
// console.log(config.baseURL, newAx);

// const baseAxios = axios.create({
// 	baseURL: process.env.VUE_APP_FB_URL,
// });

const interceptor = baseAxios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response.status !== 401) {
			return Promise.reject(error);
		}

		baseAxios.interceptors.response.eject(interceptor);

		return HttpAccount.refreshAccessToken(
			API_KEY,
			store.getters['auth/refreshToken']
		)
			.then((response) => {
				// error.response.config.headers.Authorization =
				// 	'Bearer ' + response.data.access_token;

				const retrayReq = error.request.responseURL.replace(
					null,
					response.data.access_token
				);

				store.commit('auth/setAccessToken', response.data.access_token);
				return axios(retrayReq);
			})
			.catch((error) => {
				// router.push('/login');
				return Promise.reject(error);
			})
			.finally(interceptor);
	}
);

export { baseAxios, accountAxios, tokenAxios };
