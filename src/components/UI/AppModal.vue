<template>
	<transition name="fade">
		<div
			class="modal-overplay"
			tabindex="-1"
			v-if="showModal"
			@click="closeModal"
		></div>
	</transition>

	<transition name="show">
		<div class="mymodal" v-if="showModal">
			<div class="modal-content">
				<div class="modal-header" v-if="isHeader">
					<h6 class="modal-title">{{ headerTitle }}</h6>
					<button type="button" class="btn-close" @click="closeModal"></button>
				</div>
				<div class="modal-body">
					<slot></slot>
				</div>
				<div class="modal-footer" v-if="isFooter">
					<button type="button" class="btn btn-secondary" @click="closeModal">
						Close
					</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
import { toRefs, watch } from '@vue/runtime-core';

export default {
	emits: {
		closeModal: null,
	},

	props: {
		isHeader: {
			type: Boolean,
			default: true,
		},

		headerTitle: {
			type: String,
		},

		isFooter: {
			type: Boolean,
			default: true,
		},
		showModal: {
			type: Boolean,
			required: true,
		},
	},

	setup(props, { emit }) {
		const closeModal = () => emit('closeModal');
		// TODO
		const isOpen = toRefs(props).showModal;

		const hideScroll = (val) => {
			if (val) {
				document.body.style.overflow = 'hidden';
			} else {
				setTimeout(() => {
					document.body.style.overflow = '';
				}, 300);
			}
		};

		watch(isOpen, (nevVal) => {
			hideScroll(nevVal);
		});

		return {
			closeModal,
		};
	},
};
</script>

<style>
.modal-overplay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
}

.mymodal {
	position: fixed;
	min-width: 400px;
	width: fit-content;
	height: fit-content;
	top: 6%;
	left: 0;

	right: 0;
	margin: auto;
}

.show-enter-active {
	animation: show 0.3s ease-out both;
}

.show-leave-active {
	animation: show 0.3s reverse ease-in both;
}

.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s;
	opacity: 1;
}

@keyframes show {
	0% {
		transform: translateY(-200%);
	}

	100% {
		transform: translateY(0);
	}
}
</style>
