<template>
	<AppWrap title="Категории">
		<div class="row">
			<CategoryCreate @addRecord="addRecord" />

			<CategoryEdit :category="category" @refresh="updateCategory" />
		</div>
	</AppWrap>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

import AppWrap from '@/components/UI/AppWrap.vue';
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';

export default {
	components: { AppWrap, CategoryCreate, CategoryEdit },

	setup() {
		const store = useStore();

		const load = async () => {
			await store.dispatch('info/loadInfo');
			await store.dispatch('category/loadCategory');
		};

		onMounted(load);

		const addRecord = async (record) => {
			try {
				await store.dispatch('category/sendCategory', record);
			} catch {}
		};

		const updateCategory = async (value) => {
			await store.dispatch('category/updateCategory', value);
		};

		const category = computed(() => store.getters['category/categories']);

		return { addRecord, category, updateCategory };
	},
};
</script>

<style></style>
