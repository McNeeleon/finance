<template>
	<div class="text-center mt-3">
		Not enough information add
		<strong>
			<router-link class="fst-italic" to="Category"> category </router-link>
		</strong>

		<template v-if="!showRecordLinck">
			or
			<strong>
				<router-link class="fst-italic" to="Record"> record</router-link>
			</strong>
		</template>
	</div>
</template>

<script>
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
export default {
	setup() {
		const route = useRoute();

		const showRecordLinck = computed(() => route.path.slice(1) === 'record');

		return { showRecordLinck };
	},
};
</script>

<style></style>
