<template>
	<div class="col-lg-5">
		<div class="h-100 p-4 text-white bg-dark rounded-3">
			<p class="fs-5">Счёт в валюте</p>
			<div class="currency" v-for="(i, id) in val" :key="id">
				<span class="fs-6">{{ currencyFormat(getCurrency(i), i) }}</span>
				<div class="graph border-bottom border-success border-2 my-2"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import currencyFormat from '@/utils/currencyFormat';

export default {
	props: {
		currency: {
			type: Object,
			required: true,
		},
	},

	setup(props) {
		const store = useStore();

		const val = ['RUB', 'USD', 'EUR'];

		const bill = computed(() => store.getters['info/bill']);

		const base = computed(() => {
			return bill.value / (props.currency.RUB / props.currency.USD);
		});

		const getCurrency = (cur) => {
			return base.value * props.currency[cur];
		};

		return {
			getCurrency,
			val,
			bill,
			currencyFormat,
		};
	},
};
</script>

<style></style>
