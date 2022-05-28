<template>
	<div class="container-lg">
		<div class="title mt-3 mb-4 d-flex justify-content-between" v-if="title">
			<div class="fs-4">{{ title }}</div>
			<slot name="header" />
		</div>
		<div>
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: { title: null },
};
</script>

<style scoped>
.card h1 {
	color: #333 !important;
}
</style>
