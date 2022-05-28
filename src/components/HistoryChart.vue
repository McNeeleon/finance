<template>
	<BarChart
		style="width: 500px"
		:chartData="data"
		:options="options"
		:height="300"
	/>
</template>

<script>
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from 'chart.js';
import { computed, ref, toRefs } from 'vue';

import useChartColors from '@/composables/useChartColors';

Chart.register(...registerables);

export default {
	components: { BarChart },

	props: {
		categories: {
			type: Array,
			required: true,
		},
		records: {
			type: Array,
			required: true,
		},
	},

	setup(props) {
		const { setapColors, rgbaColors, borderColors } = useChartColors();

		const { categories, records } = toRefs(props);

		setapColors(categories);

		const options = ref({
			responsive: true,
			// indexAxis: 'y',

			plugins: {
				legend: {
					display: false,
					// position: 'top',
				},
				title: {
					display: true,
					text: 'Расходы по категории',
				},
			},
		});

		const chartData = computed(() => {
			return categories.value.map((el) => {
				return records.value.reduce((acc, curr) => {
					if (el.id === curr.categoryId && curr.type === 'expense') {
						acc += curr.amount;
					}
					return acc;
				}, 0);
			});
		});

		const data = computed(() => {
			return {
				labels: categories.value.map((el) => el.title),
				datasets: [
					{
						label: 'spent',
						data: chartData.value,
						backgroundColor: rgbaColors.value,
						borderColor: borderColors.value,
						borderWidth: 1,
						maxBarThickness: 70,
						fill: false,
					},
				],
			};
		});

		return { data, options, rgbaColors, borderColors };
	},
};
</script>
