<template>
	<div class="form-check">
		<label class="form-check-label">
			<input
				class="form-check-input"
				type="radio"
				:checked="isChecked"
				:value="value"
				@change="$emit('update:modelValue', $event.target.value)"
			/>
			{{ label }}
		</label>
	</div>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			required: true,
		},
		value: {
			type: String,
			required: true,
		},
		modelValue: null,
	},
	computed: {
		isChecked() {
			return this.modelValue === this.value;
		},
	},
};
</script>

<style>
.form-check-input:checked {
	background-color: green;
	border-color: green !important;
}
.form-check-input:focus {
	box-shadow: none !important;
	border-color: green !important;
}
</style>
