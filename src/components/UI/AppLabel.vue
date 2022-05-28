<template>
	<label class="form-label" :for="idInput">
		{{ inputLable }}
	</label>
</template>

<script>
export default {
	props: {
		inputLable: {
			type: String,
			required: false,
		},
		idInput: {
			type: String,
			required: false,
		},
	},
};
</script>

<style></style>
