import {invoke} from "@tauri-apps/api/core";

export async function setupSplashscreen(callback: () => (any | Promise<void>) = () => {}) {
	console.log('Performing really heavy frontend setup task...');
	await (callback() || Promise.resolve());
	console.log('Frontend setup task complete!');

	// Set the frontend task as being completed
	await invoke('set_complete', {task: 'frontend'});
}