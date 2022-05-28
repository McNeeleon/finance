export default function (valuem, cur = 'RUB') {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: cur,
		// currencyDisplay: 'name',
	}).format(valuem);
}
