<template>
	<div class="col-lg-7">
		<div class="h-100 p-4 bg-light border rounded-3">
			<p class="fs-5">Курс валют</p>
			<table class="table">
				<thead>
					<tr>
						<th scope="col">Валюта</th>
						<th scope="col">Курс</th>
						<th scope="col">Дата</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(val, key) in currency" :key="key">
						<td>{{ key }}</td>
						<td>{{ val.toFixed(3) }}</td>
						<td>{{ dateFormat(timestamp * 1000) }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
import dateFormat from '@/utils/dateFormat';

export default {
	props: {
		currency: {
			type: Object,
			required: true,
		},
		timestamp: null,
	},

	setup(props) {
		return {
			dateFormat,
		};
	},
};
</script>

<style></style>
