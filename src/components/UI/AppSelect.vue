<template>
	<select
		class="form-select"
		v-model="selected"
		@change="$emit('update:modelValue', selected)"
	>
		<option disabled value="">Open this select menu</option>
		<option :value="item.id" v-for="item in data" :key="item.id">
			{{ item.title }}
		</option>
	</select>
</template>

<script>
import { ref, toRefs, watch } from 'vue';
export default {
	props: {
		data: {
			type: Array,
			required: true,
			default: () => [],
		},
		modelValue: null,
	},

	emits: {
		'update:modelValue': null,
	},

	setup(props) {
		const selected = ref('');

		const resetOptions = toRefs(props).modelValue;

		watch(resetOptions, (newVal) => {
			if (!newVal) {
				selected.value = '';
			}
		});

		return {
			selected,
		};
	},
};
</script>

<style>
.form-select:focus {
	box-shadow: 0 0 3px rgba(0, 128, 0, 0.6) !important;
	border-color: green !important;
}
.form-select {
	font-size: 14px;
	height: 40px;
}
</style>
