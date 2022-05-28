import { useStore } from 'vuex';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { useRouter } from 'vue-router';

export default function () {
	const store = useStore();
	const router = useRouter();
	const { handleSubmit, isSubmitting } = useForm();

	// const {
	// 	value: firstName,
	// 	errorMessage: fNmaneError,
	// 	handleBlur: fNameBlur,
	// } = useField('FirstName', yup.string().required().trim());

	const {
		value: name,
		errorMessage: nameError,
		meta: metaName,
		handleBlur: nameBlur,
	} = useField('name', yup.string().required().trim().min(2));

	const {
		value: email,
		errorMessage: emailError,
		meta: metaEmail,
		handleBlur: emailBlur,
	} = useField('email', yup.string().required().email().trim());

	const {
		value: password,
		errorMessage: passwordError,
		meta: metaPassword,
		handleBlur: passwordBlur,
	} = useField('password', yup.string().required().min(6).trim());

	const submitHandler = handleSubmit(async (values) => {
		try {
			await store.dispatch('auth/newUser', values);
			await store.dispatch('info/sendInfo', {
				bill: 0,
				name: values.name,
				email: values.email,
			});

			router.push({ name: 'Score' });

			store.dispatch('callMessage', { type: 'message', key: 'created' });
		} catch {}
	});

	return {
		// firstName,
		// fNmaneError,
		// fNameBlur,

		name,
		nameError,
		metaName,
		nameBlur,

		email,
		emailError,
		metaEmail,
		emailBlur,

		password,
		passwordError,
		metaPassword,
		passwordBlur,

		submitHandler,
		isSubmitting,
	};
}
