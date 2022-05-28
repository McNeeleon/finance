<template>
	<header class="shadow-sm">
		<nav class="position-relative py-2">
			<div class="container-fluid d-flex justify-content-between flex-wrap">
				<button class="btn p-2" @click="$emit('toggleSiebar')">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="black"
						class="bi bi-list"
						viewBox="0 0 16 16"
					>
						<path
							fill-rule="evenodd"
							d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
						/>
					</svg>
				</button>

				<ul class="nav align-items-center">
					<li class="nav-item">
						<a href="#" class="nav-link link-dark px-2 lang">
							<span class="me-2"
								><img
									style="width: 25px"
									src="https://coderthemes.com/hyper/saas/assets/images/flags/russia.jpg"
							/></span>
							<span class="me-2">Russian</span>
							<span
								><svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="currentColor"
									class="bi bi-caret-down-fill"
									viewBox="0 0 16 16"
								>
									<path
										d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
									/></svg
							></span>
						</a>
					</li>

					<li class="nav-item">
						<a
							href="#"
							class="nav-link link-dark px-2"
							@click="userDropDown = !userDropDown"
							v-click-outside="onClickOutside"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="23"
								height="23"
								fill="currentColor"
								class="bi bi-person-circle"
								viewBox="0 0 16 16"
							>
								<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
								<path
									fill-rule="evenodd"
									d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
								/>
							</svg>
						</a>
						<HeaderNav v-if="userDropDown" />
					</li>
				</ul>
			</div>
		</nav>
	</header>
</template>

<script>
import { ref } from 'vue';

import vClickOutside from 'click-outside-vue3';

import HeaderNav from '@/components/TheHeaderNav.vue';

export default {
	components: { HeaderNav },

	emits: { toggleSiebar: null },

	directives: {
		clickOutside: vClickOutside.directive,
	},

	setup() {
		const userDropDown = ref(false);

		const onClickOutside = () => (userDropDown.value = false);

		return {
			userDropDown,
			onClickOutside,
		};
	},
};
</script>

<style scoped>
nav {
	background-color: #ffff;
}
.navbar-toggler:focus {
	box-shadow: none;
}

.nav-item + .nav-item {
	margin-left: 15px;
}
nav .lang {
	/* align-self: ; */
}

.dropdown-menu i {
	margin-right: 4px;
}
.dropdown-menu-right {
	top: 100%;
	right: 1%;
	left: auto;
}
.dropdown-menu .dropdown-item:active {
	background-color: #212529;
}
</style>
