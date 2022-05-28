<template>
	<div class="table-responsive">
		<table class="table table-sm">
			<thead>
				<tr>
					<th scope="col">#</th>
					<th scope="col">Сумма</th>
					<th scope="col">Дата</th>
					<th scope="col">Категория</th>
					<th scope="col">Тип</th>
					<th scope="col">Отскрыть</th>
				</tr>
			</thead>
			<tbody>
				<tr class="" v-for="rec in tableRecords" :key="rec.id">
					<td>{{ rec.number + 1 }}</td>
					<td>{{ rec.amount }}</td>
					<td>{{ rec.date }}</td>
					<td>{{ rec.categoryName }}</td>
					<td>
						<span class="badge" :class="`bg-${rec.color}`">{{ rec.type }}</span>
					</td>
					<td>
						<button
							class="btn btn-secondary px-2 py-0"
							@click="
								$router.push({
									name: 'Details',
									params: { id: rec.id },
								})
							"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-card-list"
								viewBox="0 0 16 16"
							>
								<path
									d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
								/>
								<path
									d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"
								/>
							</svg>
						</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
// import dateFormat from '../../utils/dateFormat';

export default {
	props: {
		tableRecords: {
			// type: Array,
			required: true,
		},
	},

	// setup() {
	// 	return { dateFormat };
	// },
};
</script>

<style>
.bg {
	background-color: red !important;
}
</style>
