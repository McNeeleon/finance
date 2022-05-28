<template>
	<div class="input col mb-3">
		<fieldset :disabled="!category.length">
			<form @submit.prevent="refresh">
				<h5>Редактировать</h5>
				<p class="mb-1">Название</p>

				<AppSelect :data="category" v-model="selected" />

				<InputLabel
					inputLable="Название"
					inputType="text"
					:isError="newTitleError"
					v-model="newTitle"
				/>
				<small class="text-danger" v-if="newTitleError">
					{{ newTitleError }}
				</small>

				<InputLabel
					inputLable="Лимит"
					inputType="number"
					:isError="newLimitError"
					v-model.number="newLimit"
				/>

				<small class="text-danger" v-if="newLimitError">
					{{ newLimitError }}
				</small>

				<AppButton
					class="mt-3"
					type="submit"
					color="success"
					:disabled="isChanged"
					>Изменить
					</AppButton
				>
			</form>
		</fieldset>
	</div>
</template>

<script>
import { computed, ref, watch } from 'vue';

import InputLabel from '@/components/InputLabel.vue';
import AppSelect from '@/components/UI/AppSelect.vue';
import AppButton from '@/components/UI/AppButton.vue';

import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

export default {
	components: { InputLabel, AppSelect, AppButton },
	props: {
		category: {
			type: Array,
			required: true,
		},
	},
	setup(props, { emit }) {
		const selected = ref('');

		const isDisabled = ref(true);

		const curId = computed(() =>
			props.category.findIndex((el) => el.id === selected.value)
		);

		const curCategById = computed(() => props.category[curId.value]);

		const { handleSubmit } = useForm();

		const { value: newTitle, errorMessage: newTitleError } = useField(
			'newTitle',
			yup.string().required().trim().min(3)
		);

		const { value: newLimit, errorMessage: newLimitError } = useField(
			'newLimit',
			yup.number().typeError('Amount must be a number').min(0)
		);

		const refresh = handleSubmit((values) => {
			emit('refresh', [
				{ id: selected.value, limit: values.newLimit, title: values.newTitle },
				curId.value,
			]);
		});

		const chanchedFields = computed(
			() =>
				curCategById.value.title !== newTitle.value ||
				curCategById.value.limit !== newLimit.value
		);

		const isChanged = computed(() => {
			if (isDisabled.value) {
				return true;
			} else {
				return !chanchedFields.value;
			}
		});

		watch(selected, () => {
			const { limit, title } = curCategById.value;

			newTitle.value = title;
			newLimit.value = limit;

			isDisabled.value = false;
		});

		return {
			selected,

			newLimit,
			newLimitError,

			refresh,
			isDisabled,
			isChanged,

			newTitle,
			newTitleError,
		};
	},
};
</script>

<style></style>
