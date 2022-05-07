const getClassName = (obj: Record<string, boolean>): string => {
	const className = Object
		.keys(obj)
		.map(key => ({key, value: obj[key]}))
		.filter(obj => obj.value)
		.map(obj => obj.key)
		.join(' ');

	return className;
};

const formatCpf = (raw: string): string => {
	return raw.substring(0, 3) + "." + raw.substring(3, 6) + "." + raw.substring(6, 9) + "-" + raw.substring(9);
}

const formatPhone = (raw: string): string => {
	/* se está com DDI, DDD e 9 números */
	if (raw.length === 13) {
		return '+' + raw.substring(0, 2) + ' (' + raw.substring(2, 4) + ') ' + raw.substring(4, 9) + '-' + raw.substring(9);
	}
	/* se está com DDD e 8 números */
	if (raw.length === 10) {
		return '+55 (' + raw.substring(0, 2) + ') ' + raw.substring(2, 6) + '-' + raw.substring(6);
	}
	return raw;
}

export {
	getClassName,
	formatCpf,
	formatPhone
};