import { Buffer } from "buffer";

declare global {
	interface Window {
		Buffer: typeof Buffer;
		process: {
			stdout: any;
			stderr: any;
			nextTick(fn: (...args: unknown[]) => void, ...args: unknown[]): number;
		};
	}
}

window.Buffer = Buffer;

window.process = {
	stdout: undefined,
	stderr: undefined,
	nextTick: (fn: (...args: unknown[]) => void, ...args: unknown[]) => setTimeout(fn, undefined, ...args),
};
