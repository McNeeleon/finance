import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import chunkArray from '../utils/chunkArray';

export default function () {
	const router = useRouter();
	const route = useRoute();

	const pageSize = 8;
	const pageCount = ref(0);
	const allItems = ref([]);
	const pageElements = ref([]);
	const page = ref(1);

	const pageChanger = (arr) => {
		allItems.value = chunkArray(arr.value, pageSize);
		pageElements.value = allItems.value[page.value - 1];
	};

	const setupPagination = (arr) => {
		if (route.query.page) {
			page.value = +route.query.page;
		}

		pageChanger(arr);

		pageCount.value = allItems.value.length;

		watch(arr, () => {
			pageChanger(arr);
		});
	};

	watch(page, (val) => {
		router.push({ query: { page: page.value } });

		pageElements.value = allItems.value[val - 1];
	});

	return {
		setupPagination,
		pageElements,
		page,
		pageCount,
		pageSize,
	};
}
