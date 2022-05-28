import { computed, ref } from 'vue';

export default function (filtredRecords) {
	const sortType = ref('date:up');

	const sortKey = computed(() => {
		const first = sortType.value.split(':')[0];
		return first === 'price' ? 'amount' : first;
	});

	const sortDir = computed(() => sortType.value.split(':')[1]);

	const sortByDate = (d1, d2) =>
		new Date(d1[sortKey.value]).getTime() -
		new Date(d2[sortKey.value]).getTime();

	const sortByPrice = (p1, p2) => p1[sortKey.value] - p2[sortKey.value];

	const sortedRecords = computed(() => {
		return [...filtredRecords.value].sort((a, b) => {
			if (sortDir.value === 'up') {
				return sortKey.value === 'date' ? sortByDate(a, b) : sortByPrice(a, b);
			}
			if (sortDir.value === 'down') {
				return sortKey.value === 'date' ? sortByDate(b, a) : sortByPrice(b, a);
			}
		});
	});

	return { sortedRecords, sortType };
}
