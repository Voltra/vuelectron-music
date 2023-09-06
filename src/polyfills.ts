import { Buffer } from "buffer";

window.Buffer = Buffer;

window.process = {
	stdout: undefined,
	stderr: undefined,
	nextTick: (fn, ...args) => setTimeout(fn, undefined, ...args),
};
