export default (value) => {
	return value === null
		? []
		: Object.keys(value).map((key) => ({ id: key, ...value[key] }));
};
