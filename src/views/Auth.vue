<template>
	<div class="row align-items-center g-lg-5 mt-3">
		<div class="col-lg-6 text-center text-lg-start">
			<h1 class="display-4 fw-bold lh-1 mb-3 text-white">
				Vertically centered hero sign-up form
			</h1>
			<p class="col-lg-10 fs-4 text-white">
				Below is an example form built entirely with Bootstrap’s form controls.
				Each required form group has a validation state that can be triggered by
				attempting to submit the form without completing it.
			</p>
		</div>
		<div class="col-lg-6 col-md-10 mx-auto col-lg-5">
			<form
				class="p-4 p-md-5 border rounded-3 bg-white"
				@submit.prevent="submitHandler"
			>
				<div class="mb-3">
					<InputLabel
						myClass="form-floating"
						inputType="email"
						:isLabel="false"
						idInput="floatingInput"
						placeholder="test@mail.com"
						:isError="emailError"
						:metaDirty="metaLogin.dirty"
						v-model="login"
					>
						<template #myLabel>
							<AppLabel idInput="floatingInput" inputLable="Email" />
						</template>
					</InputLabel>

					<AppFormErrorMessage :titleError="emailError" v-if="emailError" />
				</div>

				<div class="mb-3">
					<InputLabel
						myClass="form-floating"
						inputType="password"
						:isLabel="false"
						idInput="floatingInput2"
						placeholder="password"
						:isError="passwordError"
						:metaDirty="metaPassword.dirty"
						v-model="password"
					>
						<template #myLabel>
							<AppLabel idInput="floatingInput2" inputLable="Password" />
						</template>
					</InputLabel>

					<AppFormErrorMessage
						:titleError="passwordError"
						v-if="passwordError"
					/>
				</div>

				<AppButton
					class="w-100 btn btn-lg"
					type="submit"
					:disabled="isSubmitting"
				>
					Login in
				</AppButton>

				<div class="text-center pt-3 text-muted">
					Not a member?
					<router-link to="/registration" class="text-decoration-none fw-bold">
						Sign up
					</router-link>
				</div>

				<hr class="my-4" />
				<small class="text-muted">
					By clicking Sign up, you agree to the terms of use.
				</small>
			</form>
		</div>
	</div>
</template>

<script>
import InputLabel from '../components/InputLabel.vue';
import AppButton from '../components/UI/AppButton.vue';
import AppFormErrorMessage from '../components/UI/AppFormErrorMessage.vue';
import AppLabel from '../components/UI/AppLabel.vue';
import useLoginForm from '../composables/useLoginForm';

export default {
	components: { InputLabel, AppLabel, AppFormErrorMessage, AppButton },
	setup() {
		return { ...useLoginForm() };
	},
};
</script>

<style scoped>
input:focus {
	box-shadow: none !important;
}

button {
	background-color: #023e8a !important;
	color: #ffff !important;
}

.invalid input {
	border: 1px solid red !important;
}
</style>
