<template>
	<button
		class="btn"
		:type="type"
		:class="['btn-' + color]"
		@click="$emit('action')"
	>
		<slot></slot>
	</button>
</template>

<script>
export default {
	emits: {
		action: null,
	},

	props: {
		type: {
			type: String,
			default: 'button',
		},
		color: {
			type: String,
			default: 'success',
		},
	},
};
</script>

<style scoped>
button:focus {
	box-shadow: none !important;
}
</style>
