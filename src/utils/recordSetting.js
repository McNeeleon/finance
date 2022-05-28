export default class {
	constructor(type) {
		this.type = type;
	}

	badgeColor() {
		if (this.type === 'expense') {
			return 'danger';
		} else {
			return 'success';
		}
	}

	categoryType() {
		if (this.type === 'expense') {
			return 'Расход';
		} else {
			return 'Доход';
		}
	}
}
