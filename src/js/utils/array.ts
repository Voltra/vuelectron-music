export const shuffleArrayInplace = <T>(arr: T[]) => {
	for (let i = arr.length - 1 ; i >= 0 ; i -= 1) {
		const j = Math.floor(Math.random() * i);
		let tmp = arr[i];
		arr[i] = arr[j];
		arr[j] = tmp;
	}

	return arr;
};

export const shuffleArray = <T>(arr: T[]) => {
	const copy = arr.slice(0, arr.length);

	return shuffleArrayInplace(copy);
};
