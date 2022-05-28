<template>
	<small class="text-danger d-block" v-if="titleError">
		{{ titleError }}
	</small>
</template>

<script>
export default {
	props: {
		titleError: {
			type: String,
			required: true,
		},
	},
};
</script>

<style></style>
