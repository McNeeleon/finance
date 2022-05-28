import { baseAxios, accountAxios, tokenAxios } from './reqAxios';

import currencyFormat from '../utils/currencyFormat';
import dateFormat from '../utils/dateFormat';
import fetchedDataFormat from '../utils/fetchedDataFormat';
import RecordSetting from './../utils/recordSetting';

export class httpCategory {
	static async loadCategory(userId, token) {
		const { data } = await baseAxios.get(
			`/users/${userId}/category.json?auth=${token}`
		);

		return fetchedDataFormat(data);
	}

	static async updateCategory(userId, id, token, category) {
		await baseAxios.put(
			`/users/${userId}/category/${category.id}.json?auth=${token}`,
			category
		);
	}

	static async sendCategory(userId, token, category) {
		const { data } = await baseAxios.post(
			`users/${userId}/category.json?auth=${token}`,
			category
		);
		return data;
	}

	static async getCategoryById(userId, token, id) {
		const { data } = await baseAxios.get(
			`users/${userId}/category/${id}.json?auth=${token}`
		);

		return data;
	}
}

//

export class httpRecord {
	static async loadRecords(userId, token) {
		const { data } = await baseAxios.get(
			`users/${userId}/records.json?auth=${token}`
		);

		return fetchedDataFormat(data);
	}

	static async sendRecord(userId, token, record) {
		return await baseAxios.post(
			`users/${userId}/records.json?auth=${token}`,
			record
		);
	}

	static async getRecordById(userId, token, id) {
		let { data } = await baseAxios.get(
			`users/${userId}/records/${id}.json?auth=${token}`
		);

		const detailsPageSettings = new RecordSetting(data.type);

		data = {
			...data,
			color: detailsPageSettings.badgeColor(),
			type: detailsPageSettings.categoryType(),
			amount: currencyFormat(data.amount),
			date: dateFormat(data.date, 'time'),
		};
		return data;
	}
}

//

export class httpUserInfo {
	static async loadInfo(userId, token) {
		const { data } = await baseAxios.get(
			`/users/${userId}/info.json?auth=${token}`
		);

		return fetchedDataFormat(data);
	}

	static async sendInfo(userId, token, userInfo) {
		await baseAxios.post(`users/${userId}/info.json?auth=${token}`, userInfo);
	}

	static async updateInfo(userId, infoId, token, newInfo) {
		await baseAxios.put(
			`users/${userId}/info/${infoId}.json?auth=${token}`,
			newInfo
		);
	}

	static async updateBill(userId, infoId, token, newBill) {
		await baseAxios.put(
			`users/${userId}/info/${infoId}/bill.json?auth=${token}`,
			newBill
		);
	}
}

//

export class HttpAccount {
	static async login(apiKey, loginData) {
		// const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

		const { data } = await accountAxios.post(
			`/v1/accounts:signInWithPassword?key=${apiKey}`,
			{
				...loginData,
				returnSecureToken: true,
			}
		);
		return data;
	}

	static async CtrateNewUser(apiKey, registrdata) {
		const { data } = await accountAxios.post(
			`/v1/accounts:signUp?key=${apiKey}`,
			{
				...registrdata,
				returnSecureToken: true,
			}
		);

		return data;
	}

	static async refreshAccessToken(apiKey, refreshToken) {
		const data = await tokenAxios.post(
			`/v1/token?key=${apiKey}`,
			`grant_type=refresh_token&refresh_token=${refreshToken}`
		);

		return data;
	}
}
