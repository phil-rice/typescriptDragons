import { Func } from "./nonfunctionals";

export type ErrorStrategy<From, To> = (e: any, f: From) => To


export const addErrorHandling = <From, To>(errorStrategy: ErrorStrategy<From, To>) => (bizLogic: Func<From, To>): Func<From, To> => {
    return (from: From) => {
        try {
            return bizLogic(from)
        } catch (e) {
            return errorStrategy(e, from)
        }
    }
};

export const logAndThrowES = <From, To>(logger: (msg: string) => void) => (msgFn: (e: any, from: From) => string): ErrorStrategy<From, To> => {
    return (e: any, from: From) => {
        logger(msgFn(e, from))
        throw e
    }
}