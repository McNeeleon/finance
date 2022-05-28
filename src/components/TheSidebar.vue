<template>
	<aside class="sidebar" :class="{ hide: !navIsOpen }">
		<nav>
			<div class="nav-header shadow-sm mb-2">
				<router-link class="nav-link" to="/score">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="feather feather-home"
						aria-hidden="true"
					>
						<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
						<polyline points="9 22 9 12 15 12 15 22"></polyline>
					</svg>
					<span class="d-none d-lg-block">Счет</span>
				</router-link>
			</div>
			<ul class="nav flex-column">
				<li class="nav-item">
					<router-link class="nav-link" to="/history">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-file"
							aria-hidden="true"
						>
							<path
								d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
							></path>
							<polyline points="13 2 13 9 20 9"></polyline>
						</svg>
						<span class="d-none d-lg-block"> История </span>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/planing">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-shopping-cart"
							aria-hidden="true"
						>
							<circle cx="9" cy="21" r="1"></circle>
							<circle cx="20" cy="21" r="1"></circle>
							<path
								d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
							></path>
						</svg>
						<span class="d-none d-lg-block"> Планирование </span>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/record">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-users"
							aria-hidden="true"
						>
							<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
							<circle cx="9" cy="7" r="4"></circle>
							<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
							<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
						</svg>
						<span class="d-none d-lg-block"> Новая запись </span>
					</router-link>
				</li>
				<li class="nav-item">
					<router-link class="nav-link" to="/category">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="feather feather-bar-chart-2"
							aria-hidden="true"
						>
							<line x1="18" y1="20" x2="18" y2="10"></line>
							<line x1="12" y1="20" x2="12" y2="4"></line>
							<line x1="6" y1="20" x2="6" y2="14"></line>
						</svg>
						<span class="d-none d-lg-block"> Категории </span>
					</router-link>
				</li>
			</ul>
		</nav>
	</aside>
</template>

<script>
export default {
	props: { navIsOpen: null },
};
</script>

<style scoped>
.sidebar {
	min-height: 100vh;
	box-shadow: inset -1px 0 0 rgb(0 0 0 / 10%);
	background-color: #313a46;
	min-width: 250px;
	max-width: 250px;
	transition: margin 0.4s;
}
.sidebar .nav-header {
	background-color: #ffff;
	padding: 0.8rem 0 0.5rem;
}
.sidebar .nav-link {
	font-weight: 500;
	color: #8391a2;
}
.sidebar .nav-link:hover {
	color: #bccee4;
}
.sidebar .nav-item {
	padding-bottom: 10px;
}

.nav-link {
	display: flex;
}
svg {
	width: 20px;
	height: 20px;
}
.sidebar .nav-link .feather {
	margin-right: 9px;
}

.active {
	color: #ffff !important;
	/* background-color: cornflowerblue;
	border-top-left-radius: 100px;
	border-bottom-left-radius: 100px; */
}
.nav-header .active {
	color: #313a46 !important;
}

.sidebar.hide {
	margin-left: -250px;
}

@media (max-width: 992px) {
	.sidebar {
		min-width: 60px;
		max-width: 60px;
	}
}
</style>
