<template>
	<AppPreloader v-if="loading" />

	<ShowEmptyData
		v-else-if="!records.length || !categories.length"
		:records="true"
	/>

	<AppWrap title="История записей" v-else>
		<HistoryChart class="mb-3" :records="records" :categories="categories" />

		<div class="my-2 row justify-content-between">
			<div class="col-4">
				<InputLabel
					inputType="text"
					placeholder="Serch category"
					v-model="filterInput"
				/>
			</div>

			<div class="col-4">
				<AppSelect class="col-2" :data="selectItens" v-model="sortType" />
			</div>
		</div>

		<AppTable :tableRecords="pageElements" />

		<AppPaginate
			v-model="page"
			:pageCount="pageCount"
			v-if="records.length > pageSize"
		/>
	</AppWrap>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from 'vue';
import { computed, ref } from '@vue/reactivity';

import dateFormat from '../utils/dateFormat';
import currencyFormat from '../utils/currencyFormat';
import TableSetting from '../utils/recordSetting';

import AppWrap from '@/components/UI/AppWrap.vue';
import AppTable from '@/components/UI/AppTable.vue';
import AppPreloader from '@/components/UI/AppPreloader.vue';
import AppPaginate from '@/components/UI/AppPaginate.vue';
import HistoryChart from '@/components/HistoryChart.vue';
import AppSelect from '@/components/UI/AppSelect.vue';
import InputLabel from '@/components/InputLabel.vue';
import ShowEmptyData from '@/components/ShowEmptyData.vue';

import usePagination from '../composables/usePagination';
import useRecordFilter from '../composables/useRecordFilter';
import useRecordSort from '../composables/useRecordSort';

export default {
	components: {
		AppWrap,
		AppTable,
		AppPreloader,
		AppPaginate,
		AppSelect,
		InputLabel,

		HistoryChart,
		ShowEmptyData,
	},

	setup() {
		const { setupPagination, pageElements, page, pageCount, pageSize } =
			usePagination();

		const store = useStore();

		const loading = ref(true);

		const selectItens = [
			{ id: 'date:up', title: 'По дате (возрастания)' },
			{ id: 'date:down', title: 'По дате (убыванию)' },
			{ id: 'price:up', title: 'По цене (возрастания)' },
			{ id: 'price:down', title: 'По цене (убыванию)' },
		];

		const load = async () => {
			loading.value = true;
			await store.dispatch('category/loadCategory');
			await store.dispatch('record/loadRecords');
			loading.value = false;

			setupPagination(tableRecords);
		};

		onMounted(load);

		const categories = computed(() => store.getters['category/categories']);
		const records = computed(() => store.getters['record/records']);

		const { filtredRecords, filterInput } = useRecordFilter(
			categories,
			records
		);

		const { sortedRecords, sortType } = useRecordSort(filtredRecords);

		const categoryName = (curVal) =>
			categories.value.find((c) => curVal.categoryId === c.id);

		const tableRecords = computed(() => {
			return sortedRecords.value.map((el, id) => {
				const tableSetting = new TableSetting(el.type);

				return {
					...el,
					categoryName: categoryName(el).title,
					amount: currencyFormat(el.amount),
					date: dateFormat(el.date, 'time'),
					type: tableSetting.categoryType(),
					color: tableSetting.badgeColor(),
					number: id,
				};
			});
		});

		return {
			loading,
			categories,
			records,
			selectItens,
			tableRecords,

			sortType,
			filterInput,

			pageElements,
			page,
			pageCount,
			pageSize,
		};
	},
};
</script>

<style></style>
