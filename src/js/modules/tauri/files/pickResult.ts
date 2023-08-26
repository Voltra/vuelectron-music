export type PickResult = string[] | string | null;

export const asMultiplePicks = (pickResult: PickResult): string[] => {
	if (Array.isArray(pickResult)) {
		return pickResult;
	} else if (pickResult === null) {
		return [];
	} else {
		return [pickResult];
	}
}
