import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export default function () {
	const router = useRouter();
	const store = useStore();

	const { handleSubmit, isSubmitting } = useForm();

	const {
		value: login,
		errorMessage: emailError,

		meta: metaLogin,
	} = useField('email', yup.string().required('Введите email').trim().email());

	const {
		value: password,
		errorMessage: passwordError,

		meta: metaPassword,
	} = useField(
		'password',
		yup.string().required('Введите пароль').trim().min(5)
	);

	const submitHandler = handleSubmit(async (values) => {
		try {
			await store.dispatch('auth/login', values);
			router.push({ name: 'Score' });
			store.dispatch('callMessage', { type: 'message', key: 'enter' });
		} catch {}
	});

	return {
		submitHandler,
		login,
		password,
		emailError,

		metaLogin,
		passwordError,

		metaPassword,
		isSubmitting,
	};
}
