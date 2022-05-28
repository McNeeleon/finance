<template>
	<div :class="[myClass, { invalid: isError }]">
		<AppLabel
			class="form-label mb-1"
			:inputLable="inputLable"
			:idInput="idInput || 'input' + randomId"
			v-if="isLabel"
		/>

		<input
			class="form-control"
			:inputType="inputType"
			:class="[isError ? 'is-invalid' : { 'is-valid': metaDirty }]"
			:placeholder="placeholder"
			:type="inputType"
			:value="modelValue"
			:id="idInput || 'input' + randomId"
			@input="$emit('update:modelValue', $event.target.value)"
		/>

		<slot name="myLabel"></slot>
	</div>
</template>

<script>
import AppLabel from './UI/AppLabel.vue';

export default {
	components: { AppLabel },

	inheritAttrs: false,

	emits: ['update:modelValue'],

	props: {
		inputType: {
			type: String,
			required: true,
		},
		isLabel: {
			type: Boolean,
			required: false,
			default: true,
		},
		inputLable: {
			type: String,
			required: false,
		},
		placeholder: {
			type: String,
			required: false,
		},

		myClass: null,

		modelValue: {
			required: true,
		},

		isError: {
			type: String,
			required: false,
		},
		metaDirty: {
			type: Boolean,
			required: false,
		},

		idInput: null,
	},

	setup() {
		const randomId = Math.round(Math.random() * 100);

		return {
			randomId,
		};
	},
};
</script>

<style>
.form-control {
	font-size: 14px;
}

.form-control:focus {
	box-shadow: 0 0 3px rgba(0, 128, 0, 0.6) !important;
	border: 1px solid green !important;
}

.invalid .form-control {
	box-shadow: none !important;
	border: 1px solid red !important;
}
.invalid .form-control:focus {
	box-shadow: 0 0 3px rgb(255, 0, 0) !important;
}
</style>
