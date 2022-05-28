<template>
	<form
		class="row g-2 bg-light p-4 rounded shadow-lg mt-5"
		@submit.prevent="submitHandler"
	>
		<h3 class="text-center">Регистрация</h3>

		<div class="col-12">
			<InputLabel
				inputLable="Name*"
				inputType="text"
				:isError="nameError"
				:metaDirty="metaName.dirty"
				v-model="name"
			/>

			<small class="text-danger mt-1 ms-1" v-if="nameError">
				{{ nameError }}
			</small>
		</div>

		<div class="col-12">
			<InputLabel
				inputLable="Email*"
				inputType="email"
				:isError="emailError"
				:metaDirty="metaEmail.dirty"
				v-model="email"
			/>
			<small class="text-danger mt-1 ms-1" v-if="emailError">
				{{ emailError }}
			</small>
		</div>

		<div class="col-12">
			<InputLabel
				inputLable="Password*"
				inputType="password"
				:isError="passwordError"
				:metaDirty="metaPassword.dirty"
				v-model="password"
			/>

			<small class="text-danger mt-1 ms-1" v-if="passwordError">
				{{ passwordError }}
			</small>
		</div>

		<div class="col-12 mt-3">
			<AppButton type="submit" :disabled="isSubmitting">Register</AppButton>
		</div>
	</form>
</template>

<script>
import AppButton from '../components/UI/AppButton.vue';
import registerForm from '../composables/useRegisterForm';
import InputLabel from '@/components/InputLabel.vue';

export default {
	components: { InputLabel, AppButton },
	setup() {
		return {
			...registerForm(),
		};
	},
};
</script>

<style scoped>
form {
	max-width: 600px;
	margin: auto;
}
</style>
