<template>
	<div class="bar-wrap">
		<!-- <span class="text-dark">Loading...</span> -->
		<div class="bar-container">
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
			<div class="bar"></div>
		</div>
	</div>
</template>

<script>
export default {};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Lato:300,400);

.bar-wrap {
	text-align: center;
	font-family: 'Lato';
	overflow: hidden;
}

/* linear loading */
.bar-container {
	position: relative;
	height: 6px;
	width: 100%;
	background-color: #bdbdbd;
}

.bar {
	content: '';
	display: inline;
	position: absolute;
	height: 100%;
	width: 0;
	right: 0;
}

.bar:nth-child(1) {
	background-color: #006495;
	animation: linear_loader 3s linear 1s infinite;
}

.bar:nth-child(2) {
	background-color: #1a9bce;
	animation: linear_loader 3s linear 2s infinite;
}

.bar:nth-child(3) {
	background-color: #696cf0;
	animation: linear_loader 3s linear 3s infinite;
}

@keyframes linear_loader {
	0% {
		right: 100%;
		width: 10%;
	}
	30% {
		right: 0%;
		width: 40%;
	}
	50% {
		right: 0%;
		width: 0%;
	}
	80% {
		right: 0%;
		width: 0%;
	}
	100% {
		right: 0%;
		width: 0%;
	}
}
</style>
