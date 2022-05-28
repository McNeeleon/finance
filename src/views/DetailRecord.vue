<template>
	<AppPreloader v-if="loading" />

	<AppWrap v-else>
		<div class="pt-2">
			<nav
				style="
					--bs-breadcrumb-divider: url('data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'8\' height=\'8\'%3E%3Cpath d=\'M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z\' fill=\'currentColor\'/%3E%3C/svg%3E');
				"
			>
				<ol class="breadcrumb fs-6">
					<li class="breadcrumb-item">
						<router-link class="text-dark" to="/history">История</router-link>
					</li>
					<li class="breadcrumb-item text-dark">{{ record.type }}</li>
				</ol>
			</nav>
			<div class="mt-2">
				<div class="card ms-3" style="width: 25rem">
					<div class="card-body fs-6">
						<p>Описание: {{ record.description }}.</p>
						<p>Категория: {{ category.title }}.</p>
						<p>Сумма: {{ record.amount }}.</p>
						<p>
							Тип:
							<span class="badge ms-1" :class="`bg-${record.color}`">
								{{ record.type }}
							</span>
						</p>
					</div>
					<div class="card-footer">
						<small class="text-muted">Запись от: {{ record.date }}</small>
					</div>
				</div>
			</div>
		</div>
	</AppWrap>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import AppWrap from '@/components/UI/AppWrap.vue';

import { httpCategory, httpRecord } from '../axios/api';
import AppPreloader from '../components/UI/AppPreloader.vue';

export default {
	components: { AppWrap, AppPreloader },
	props: ['id'],

	setup(props) {
		const store = useStore();

		const record = ref([]);
		const category = ref([]);
		const loading = ref(false);

		const load = async () => {
			loading.value = true;

			const res = await httpRecord.getRecordById(
				userId.value,
				token.value,
				props.id
			);

			category.value = await httpCategory.getCategoryById(
				userId.value,
				token.value,
				res.categoryId
			);

			record.value = res;

			loading.value = false;
		};

		onMounted(load);
		const token = computed(() => store.getters['auth/token']);
		const userId = computed(() => store.getters['auth/userId']);

		return {
			record,
			category,
			loading,
		};
	},
};
</script>

<style></style>
