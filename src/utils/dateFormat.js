export default function (d, time) {
	const date = new Date(d);

	const t = time && { hour: 'numeric', minute: 'numeric', second: 'numeric' };

	return new Intl.DateTimeFormat('ru-RU', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
		...t,
	}).format(date);
}
