import { computed, ref } from 'vue';

export default function (category, record) {
	const filterInput = ref('');

	const serchedCategories = computed(() =>
		category.value.filter((c) => c.title.includes(filterInput.value))
	);

	const filtredRecords = computed(() =>
		serchedCategories.value.flatMap((el) => {
			return record.value.filter((r) => el.id === r.categoryId);
		})
	);

	return { filtredRecords, filterInput };
}
