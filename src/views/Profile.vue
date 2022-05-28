<template>
	<AppPreloader v-if="loading" />
	<AppWrap class="mt-5 mb-5" v-else>
		<div
			class="row justify-content-center bg-white mx-auto"
			style="max-width: 900px"
		>
			<div class="col-md-5 col-lg-4 border-right">
				<div class="d-flex flex-column align-items-center text-center p-3 py-5">
					<img
						class="rounded-circle mt-5 avatar"
						width="150px"
						src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
					/><span class="font-weight-bold">{{ name }}</span
					><span class="text-black-50">{{ email }}</span
					><span> </span>
				</div>
			</div>

			<div class="col-md-7 col-lg-5 border-right">
				<div class="p-3 py-5">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<h4 class="text-right">Profile Settings</h4>
					</div>

					<form @submit.prevent="submitHandler">
						<div class="row">
							<div class="col-md-6">
								<InputLabel
									inputLable="Name"
									inputType="text"
									idName="input"
									v-model="name"
								/>
							</div>
						</div>

						<div class="mt-2">
							<InputLabel
								inputLable="Стартовый капитал"
								inputType="text"
								idName="input"
								v-model="bill"
							/>
						</div>

						<div class="mt-2">
							<InputLabel
								inputLable="email"
								inputType="email"
								idName="input"
								v-model="email"
							/>
						</div>

						<div class="mt-5 text-center">
							<button class="btn btn-success profile-button" type="submit">
								Save Profile
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</AppWrap>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

import AppWrap from '@/components/UI/AppWrap.vue';
import InputLabel from '@/components/InputLabel.vue';
import AppPreloader from '../components/UI/AppPreloader.vue';

export default {
	components: { AppWrap, InputLabel, AppPreloader },

	setup() {
		// TODO : button
		const store = useStore();

		const name = ref('');

		const email = ref('');
		const bill = ref(0);

		const loading = ref(true);

		const loaddata = async () => {
			loading.value = true;
			await store.dispatch('info/loadInfo');
			loading.value = false;

			name.value = info.value.name;
			bill.value = info.value.bill;
			email.value = info.value.email;
		};

		onMounted(loaddata);

		const info = computed(() => store.getters['info/info']);

		const submitHandler = async () => {
			await store.dispatch('info/updateInfo', {
				name: name.value,
				// surname: surname.value,
				email: email.value,
				bill: bill.value,
			});
		};

		return {
			name,

			email,
			bill,
			submitHandler,

			loading,
		};
	},
};
</script>

<style>
.form-control:focus {
	box-shadow: none;
	border-color: #008000;
}

.avatar {
	width: 150px;
}
</style>
