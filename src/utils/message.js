const ERROR_MESSAGE = {
	EMAIL_EXISTS: {
		message: 'Пользователь с таой почтой существует',
		type: 'primary',
	},
	INVALID_PASSWORD: { message: 'Не верный пароль', type: 'danger' },
	EMAIL_NOT_FOUND: {
		message: 'Пользователь с такой почтой не найден',
		type: 'danger',
	},
};

const USER_MESSAGE = {
	logout: { message: 'Выход', type: 'info' },
	created: { message: 'Аккаунт успешно создан', type: 'success' },
	enter: { message: 'Вход', type: 'success' },
	added: { message: 'Успешно добавленно', type: 'info', isTitle: false },
	changed: { message: 'Успешно изменено', type: 'info' },
};

export function message(type, key) {
	// return type === 'message' ?  USER_MESSAGE[key] ? USER_MESSAGE[key] : 'Unknown error';

	if (type === 'message') {
		return USER_MESSAGE[key] ? USER_MESSAGE[key] : 'Unknown error';
	}
	if (type === 'error') {
		return ERROR_MESSAGE[key] ? ERROR_MESSAGE[key] : 'Unknown error';
	}
	return key;
}
