<template>
	<AppPreloader v-if="loading" />

	<ShowEmptyData v-else-if="!records.length || !categories.length" />

	<AppWrap title="Планирование" v-else>
		<template v-for="item in progressBar" :key="item.id">
			<p class="m-0 mt-3" style="font-weight: 600">
				{{ item.title }}: {{ item.spend }} из {{ item.limit }}
			</p>
			<div class="progress mt-2" style="height: 10px" v-tooltip="item.tooltip">
				<div
					class="progress-bar progress-bar-striped progress-bar-animated"
					:class="[`bg-${item.progressColor}`]"
					:style="{ width: item.progressPersent + '%' }"
				></div>
			</div>
		</template>
	</AppWrap>
</template>

<script>
import { useStore } from 'vuex';
import { computed, onMounted, ref } from 'vue';

import AppWrap from '@/components/UI/AppWrap.vue';
import AppPreloader from '@/components/UI/AppPreloader.vue';
import ShowEmptyData from '@/components/ShowEmptyData.vue';

import tooltip from '../directives/tooltip';

import currencyFormat from '../utils/currencyFormat';

export default {
	components: { AppWrap, AppPreloader, ShowEmptyData },
	directives: { tooltip },

	setup() {
		const store = useStore();

		const loading = ref(true);

		const load = async () => {
			loading.value = true;
			await store.dispatch('record/loadRecords');
			await store.dispatch('category/loadCategory');
			loading.value = false;
			// console.log(progressBar.value);
		};

		onMounted(load);

		const records = computed(() => store.getters['record/records']);
		const categories = computed(() => store.getters['category/categories']);

		const sameItems = (val) =>
			records.value.filter((r) => val.id === r.categoryId);

		const spendMony = (id) =>
			id
				.filter((el) => el.type === 'expense')
				.reduce((acc, curr) => (acc += curr.amount), 0);

		const progressBar = computed(() => {
			return categories.value.map((cat) => {
				//
				const spend = spendMony(sameItems(cat));

				const persent = (100 * spend) / cat.limit;
				const progressPersent = persent > 100 ? 100 : persent;

				const progressColor =
					persent < 60
						? 'success'
						: persent > 60 && persent <= 90
						? 'warning'
						: 'danger';

				const rest = cat.limit - spend;

				const tooltip = `${
					rest > 0 ? 'Осталось' : 'Превышен на'
				} ${currencyFormat(Math.abs(rest))}`;

				return { ...cat, spend, progressPersent, progressColor, tooltip };
			});
		});

		return {
			loading,
			records,
			categories,
			progressBar,
		};
	},
};
</script>

<style></style>
