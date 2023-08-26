import sassMetaVariables from "@/scss/variables/_metas.module.scss";

const delay = parseFloat(sassMetaVariables.transitionDuration) * 1000;

export const afterTransition = (callback: () => any|Promise<any>) => new Promise((resolve, reject) => {
	setTimeout(async () => {
		try {
			const result = await callback();
			resolve(result);
		} catch(e) {
			reject(e);
		}
	}, delay);
});
