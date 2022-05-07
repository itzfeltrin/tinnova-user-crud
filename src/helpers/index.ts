const getClassName = (obj: Record<string, boolean>): string => {
	const className = Object
		.keys(obj)
		.map(key => ({key, value: obj[key]}))
		.filter(obj => obj.value)
		.map(obj => obj.key)
		.join(' ');

	return className;
};

export {
	getClassName
};