<template>
	<div
		class="dropdown-menu d-block dropdown-menu-right shadow animated--grow-in"
	>
		<router-link class="dropdown-item" to="profile">
			<i class="bi bi-person-fill"></i>
			Profile
		</router-link>
		<a class="dropdown-item" href="#">
			<i class="bi bi-gear-fill"></i>
			Settings
		</a>
		<div class="dropdown-divider"></div>
		<a class="dropdown-item" href="#" @click.prevent="logout">
			<i class="bi bi-box-arrow-right"></i>
			Logout
		</a>
	</div>
</template>

<script>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
	setup() {
		const router = useRouter();
		const store = useStore();

		const logout = () => {
			store.commit('auth/logout');
			router.push({ name: 'Auth', query: { message: 'logout' } });
			store.dispatch('callMessage', { type: 'message', key: 'logout' });
		};

		return {
			logout,
		};
	},
};
</script>

<style></style>
