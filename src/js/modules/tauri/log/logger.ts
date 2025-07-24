import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';


export type ConsoleLogMethods = "log"|"debug"|"error"|"info"|"warn";

export type ConsoleLogger = Record<ConsoleLogMethods, (...args: unknown[]) => void>;

const wrapLog = (method: ConsoleLogMethods, log: (msg: string) => Promise<any>) => (msg: string) => {
	console[method](msg);
	return log(msg);
};

export const logger = {
	log: trace,
	debug,
	info,
	warn,
	error,
};

export const biLogger = {
	log: wrapLog("log", logger.log),
	debug: wrapLog("debug", logger.debug),
	info: wrapLog("info", logger.info),
	warn: wrapLog("warn", logger.warn),
	error: wrapLog("error", logger.error),
};