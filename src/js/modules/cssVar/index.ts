const asCssVarName = (name: string): `--${string}` => name.startsWith("--") ? name as `--${string}` : `--${name}`;

export const getCssVar = (name: string) => {
	const varName = asCssVarName(name);
	return getComputedStyle(document.documentElement).getPropertyValue(varName);
};

export const setCssVar = (name: string, value: string|number) => {
	const varName = asCssVarName(name);
	document.documentElement.style.setProperty(varName, `${value}`);
};
