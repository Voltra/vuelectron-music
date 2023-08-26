import { TinyColor } from "@ctrl/tinycolor"

export const mixColors = (lhs: string, rhs: string, rhsAmount: number) => {
	const amount = rhsAmount <= 1 ? rhsAmount * 100 : rhsAmount;

	return new TinyColor(lhs).mix(rhs, amount).toHexString();
};

export const darken = (color: string, amount: number) => {
	const darkAmount = amount <= 1 ? amount * 100 : amount;
	return new TinyColor(color).darken(darkAmount).toHexString();
};

export const lighten = (color: string, amount: number) => {
	const darkAmount = amount <= 1 ? amount * 100 : amount;
	return new TinyColor(color).lighten(darkAmount).toHexString();
};
