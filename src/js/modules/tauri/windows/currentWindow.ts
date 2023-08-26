import { getCurrent } from "@tauri-apps/api/window";

export const getCurrentWindow = () => getCurrent();

export const closeCurrentWindow = () => getCurrentWindow().close();

export const minimizeCurrentWindow = () => getCurrentWindow().minimize();
export const unMinimizeCurrentWindow = () => getCurrentWindow().unminimize();

export const maximizeCurrentWindow = () => getCurrentWindow().maximize();
export const unMaximizeCurrentWindow = () => getCurrentWindow().unmaximize();

export const toggleMaximizeCurrentWindow = async () => {
	const window = getCurrentWindow();
	const isMaximized = await window.isMaximized();
	return isMaximized ? window.unmaximize() : window.maximize();
};
