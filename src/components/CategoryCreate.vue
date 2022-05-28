<template>
	<div class="col mb-3">
		<form @submit.prevent="submitHandler">
			<h5>Создать</h5>

			<InputLabel
				inputLable="Название"
				inputType="text"
				:isError="titleError"
				:metaDirty="metaTitle.dirty"
				v-model="title"
			/>

			<AppFormErrorMessage :titleError="titleError" v-if="titleError" />

			<InputLabel
				inputLable="Лимит"
				inputType="number"
				:isError="limitError"
				:metaDirty="metaLimit.dirty"
				v-model.number="limit"
			/>

			<AppFormErrorMessage :titleError="limitError" v-if="limitError" />

			<AppButton
				class="mt-3"
				type="submit"
				color="success"
				:disabled="isSubmitting || isDisabled"
			>
				Добавить
			</AppButton>
		</form>
	</div>
</template>

<script>
import { computed } from '@vue/reactivity';

import InputLabel from '../components/InputLabel.vue';
import AppButton from '@/components/UI/AppButton.vue';

import * as yup from 'yup';
import { useField, useForm } from 'vee-validate';
import AppFormErrorMessage from './UI/AppFormErrorMessage.vue';

export default {
	components: { InputLabel, AppButton, AppFormErrorMessage },

	emits: { addRecord: null },

	setup(_, { emit }) {
		const { handleSubmit, isSubmitting } = useForm();

		const {
			value: title,
			errorMessage: titleError,
			meta: metaTitle,
		} = useField('title', yup.string().required().trim().min(3));

		const {
			value: limit,
			errorMessage: limitError,
			meta: metaLimit,
		} = useField(
			'limit',
			yup.number().typeError('Amount must be a number').required().min(0)
		);

		const isDisabled = computed(() => titleError.value || limitError.value);

		const submitHandler = handleSubmit((values, { resetForm }) => {
			emit('addRecord', values);
			resetForm();
		});

		return {
			submitHandler,
			isDisabled,

			title,
			metaTitle,
			titleError,

			limit,
			metaLimit,
			limitError,

			isSubmitting,
		};
	},
};
</script>

<style></style>
