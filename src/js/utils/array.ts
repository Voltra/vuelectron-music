export const shuffleArrayInplace = <T>(arr: T[]) => {
	for (let i = arr.length - 1 ; i >= 0 ; i -= 1) {
		const j = Math.random() * i;
		[arr[j], arr[i]] = [arr[i], arr[j]];
	}

	return arr;
};

export const shuffleArray = <T>(arr: T[]) => {
	const copy = arr.slice();

	return shuffleArrayInplace(copy);
};
