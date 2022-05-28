<template>
	<transition name="trans" appear>
		<div
			:class="['alert', `alert-${errorMessage.type || 'warning'}`]"
			v-if="infoMessage"
		>
			<div class="d-flex justify-content-between">
				<div class="d-flex">
					<div class="title d-flex align-items-center">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="currentColor"
							class="bi bi-check-circle"
							viewBox="0 0 16 16"
						>
							<path
								d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
							/>
							<path
								d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"
							/>
						</svg>
						<strong class="ps-2">info:</strong>
					</div>
					<div class="ms-2">{{ errorMessage.message || errorMessage }}</div>
				</div>
				<button type="button" class="btn-close" @click="closeMessage"></button>
			</div>
		</div>
	</transition>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import { message } from '@/utils/message';

export default {
	setup() {
		const store = useStore();

		// const TITLE = {
		// 	danger: 'Warning',
		// 	primary: 'Info',
		// 	info: 'Well done',
		// 	success: 'Well done',
		// };

		const infoMessage = computed(() => store.getters.infoMessage);

		const errorMessage = computed(() =>
			message(infoMessage.value.type, infoMessage.value.key)
		);

		// const title = computed(() =>
		// 	errorMessage.value ? TITLE[errorMessage.value.type] : null
		// );
		// console.log(errorMessage);

		const closeMessage = () => store.commit('clearMessage');

		return { infoMessage, errorMessage, closeMessage };
	},
};
</script>

<style>
.alert {
	position: fixed !important;
	top: 2%;
	left: 0;
	right: 0;
	margin: auto;
	max-width: 400px;
	min-width: 300px;
	/* opacity: 0.9; */
	transition: transform 2s;
	z-index: 9999;
}

.trans-enter-active {
	animation: trans 0.5s ease-out both;
}

.trans-leave-active {
	animation: trans 0.5s reverse ease-in both;
}

@keyframes trans {
	0% {
		transform: translateY(-200%);
	}

	100% {
		transform: translateY(0);
	}
}
</style>
