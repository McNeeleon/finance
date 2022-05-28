<template>
	<div class="d-flex">
		<AppMessage />

		<TheSidebar :navIsOpen="navIsOpen" />

		<div class="content-wrapper ms-auto">
			<TheHeader @toggleSiebar="navIsOpen = !navIsOpen" />
			<main>
				<router-view></router-view>
			</main>
		</div>
	</div>
</template>

<script>
import TheHeader from '@/components/TheHeader.vue';
import TheSidebar from '@/components/TheSidebar.vue';

import { ref } from 'vue';

import AppMessage from '../components/UI/AppMessage.vue';

export default {
	components: { TheHeader, TheSidebar, AppMessage },

	setup() {
		const navIsOpen = ref(true);
		const loading = ref(true);

		return {
			navIsOpen,
			loading,
		};
	},
};
</script>

<style>
body {
	/* background-color: #212529; */
	background-color: #f7f8fc !important;
}
.content-wrapper {
	width: 100%;
	min-height: 100vh;
}
</style>
