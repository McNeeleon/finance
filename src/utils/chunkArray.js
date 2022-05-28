export default function (arr, ch) {
	const res = [];

	for (let i = 0; i < arr.length; i += ch) {
		const cur = arr.slice(i, i + ch);

		res.push(cur);
	}
	return res;
}
