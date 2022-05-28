<template>
	<div class="auth-wrap">
		<div class="container-sm px-4 py-1">
			<AppMessage />
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import AppMessage from '../components/UI/AppMessage.vue';
export default {
	components: { AppMessage },
	setup() {},
};
</script>

<style scoped>
.auth-wrap {
	width: 100%;
	min-height: 100vh;
	background-color: #313a46;
}
</style>
