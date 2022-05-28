import { ref } from 'vue';

export default function () {
	const rgbaColors = ref();
	const borderColors = ref();

	const randomNumber = () => Math.floor(Math.random() * (255 - 0 + 1) + 0);

	const randomColors = () => {
		return `rgba(${[randomNumber(), randomNumber(), randomNumber(), 0.3].join(
			','
		)})`;
	};

	const setapColors = (array) => {
		const leng = array.value.length;

		rgbaColors.value = Array.from(Array(leng), () => randomColors());

		borderColors.value = borderVisibility(rgbaColors.value);
	};

	const borderVisibility = (col) => {
		return col.map((el) =>
			el
				.split()
				.map((r) => r.slice(0, r.length - 2) + 6)
				.join('')
		);
	};

	return { setapColors, rgbaColors, borderColors };
}
