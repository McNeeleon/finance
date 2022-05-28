<template>
	<AppPreloader v-if="loading" />

	<ShowEmptyData v-else-if="!categories.length" />

	<AppWrap title="Новая запись" v-else>
		<form @submit.prevent="submitHandler">
			<p class="mb-2">Выбирите категорию</p>

			<AppSelect :data="categories" v-model="selected" />

			<AppFormErrorMessage :titleError="selectedError" v-if="selectedError" />

			<div class="check mb-4 mt-2">
				<AppRadioButton value="income" label="Доход" v-model="picked" />

				<AppRadioButton value="expense" label="Расход" v-model="picked" />
			</div>

			<div class="input mb-3">
				<InputLabel
					inputLable="Сумма"
					inputType="number"
					:isError="amountError"
					:metaDirty="amountMeta.dirty"
					v-model.number="amount"
				/>

				<AppFormErrorMessage :titleError="amountError" v-if="amountError" />

				<InputLabel
					inputLable="Описание"
					inputType="text"
					:isError="descriptionError"
					:metaDirty="descriptionMeta.dirty"
					v-model="description"
				/>

				<AppFormErrorMessage
					:titleError="descriptionError"
					v-if="descriptionError"
				/>
			</div>

			<AppButton type="submit">Сохранить</AppButton>
		</form>
	</AppWrap>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from '@vue/runtime-core';

import AppWrap from '@/components/UI/AppWrap.vue';
import AppSelect from '../components/UI/AppSelect.vue';
import AppPreloader from '../components/UI/AppPreloader.vue';
import AppRadioButton from '../components/UI/AppRadioButton.vue';
import ShowEmptyData from '@/components/ShowEmptyData.vue';
import InputLabel from '../components/InputLabel.vue';
import AppFormErrorMessage from '../components/UI/AppFormErrorMessage.vue';
import AppButton from '../components/UI/AppButton.vue';

import useRecordForm from '../composables/useRecordForm';

export default {
	components: {
		AppWrap,
		AppSelect,
		AppPreloader,
		InputLabel,
		AppRadioButton,
		ShowEmptyData,
		AppFormErrorMessage,
		AppButton,
	},

	setup() {
		const store = useStore();

		const loading = ref(true);

		const load = async () => {
			loading.value = true;
			await store.dispatch('info/loadInfo');
			await store.dispatch('category/loadCategory');
			loading.value = false;
		};

		onMounted(load);

		const categories = computed(() => store.getters['category/categories']);

		return {
			categories,
			loading,

			...useRecordForm(),
		};
	},
};
</script>

<style></style>
