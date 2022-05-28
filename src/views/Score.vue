<template>
	<AppPreloader v-if="loading" />

	<AppWrap title="Счет" v-else>
		<template #header>
			<AppButton @click="updateCurrency">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="currentColor"
					class="bi bi-arrow-clockwise"
					viewBox="0 0 16 16"
				>
					<path
						fill-rule="evenodd"
						d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
					/>
					<path
						d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
					/>
				</svg>
			</AppButton>
		</template>

		<div class="row align-items-md-stretch gy-3">
			<ScoreCurrency :currency="currency.quotes" />

			<ScoreExchange
				:currency="currency.quotes"
				:timestamp="currency.timestamp"
			/>
		</div>
	</AppWrap>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';

import AppWrap from '@/components/UI/AppWrap.vue';
import ScoreCurrency from '@/components/ScoreCurrency.vue';
import ScoreExchange from '@/components/ScoreExchange.vue';

import AppPreloader from '@/components/UI/AppPreloader.vue';
import AppButton from '../components/UI/AppButton.vue';

export default {
	components: {
		AppWrap,
		ScoreCurrency,
		ScoreExchange,
		AppPreloader,
		AppButton,
	},

	setup() {
		const store = useStore();

		const loading = ref(true);

		const load = async () => {
			loading.value = true;

			await store.dispatch('loadCurrency');
			await store.dispatch('info/loadInfo');

			loading.value = false;
		};

		onMounted(load);

		const updateCurrency = () => load();

		const currency = computed(() => store.getters.currency);

		return {
			loading,
			currency,
			updateCurrency,
		};
	},
};
</script>

<style></style>
