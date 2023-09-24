import { MethodNames } from "@/types";

const bindMethod = <Obj extends object, Key extends MethodNames<Obj>>(obj: Obj, methodName: Key) => {
	obj[methodName] = obj[methodName].bind(obj);
};

export const bindMethods = <Obj extends object, Keys extends ReadonlyArray<MethodNames<Obj>>>(obj: Obj, methodNames: Keys) => {
	methodNames.forEach(methodName => bindMethod(obj, methodName));
};
