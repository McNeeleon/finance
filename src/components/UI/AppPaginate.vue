<template>
	<nav>
		<ul class="pagination">
			<li class="page-item" :class="{ disabled: page <= 1 }">
				<a class="page-link" @click="prev">Previous</a>
			</li>

			<li
				class="page-item"
				:class="{ active: activeClass - 1 === index }"
				v-for="(item, index) in pageCount"
				:key="index"
				@click="(activeClass = index + 1), (page = item)"
			>
				<a class="page-link" href="#">{{ item }}</a>
			</li>

			<li class="page-item" :class="{ disabled: page >= pageCount }">
				<a class="page-link" href="#" @click="next">Next</a>
			</li>
		</ul>
	</nav>
</template>

<script>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

export default {
	emits: {
		'update:modelValue': null,
	},
	props: {
		modelValue: null,
		pageCount: {
			type: Number,
			required: true,
		},
	},

	setup(props, { emit }) {
		const route = useRoute();

		// TODO
		const page = ref(props.modelValue);

		const pageNumbers = ref([1, 2, 3]);

		const activeClass = ref(1);

		const next = () => {
			page.value++;

			if (activeClass.value >= pageNumbers.value.length) {
				pageNumbers.value = pageNumbers.value.map((el) => ++el);
			} else {
				activeClass.value += 1;
			}
		};

		const prev = () => {
			if (page.value <= 1) {
				return;
			}

			if (activeClass.value <= 1) {
				pageNumbers.value = pageNumbers.value.map((el) => --el);
			} else {
				activeClass.value -= 1;
			}
			page.value -= 1;
		};

		const setActualPageNumbers = () => {
			const curPage = page.value - pageNumbers.value.length;

			if (curPage >= 1) {
				pageNumbers.value = pageNumbers.value.map((el) => el + curPage);
			}
		};

		const setActualActiveClass = () => {
			activeClass.value = pageNumbers.value.indexOf(page.value) + 1;
		};

		if (route.query.page) {
			page.value = +route.query.page;
			setActualPageNumbers();
			setActualActiveClass();
		}

		watch(page, (value) => {
			emit('update:modelValue', value);
		});

		return {
			prev,
			next,
			page,
			pageNumbers,
			activeClass,
		};
	},
};
</script>

<style>
a:hover {
	cursor: pointer;
}
</style>
