import {} from "./errorhandling";
import { Func } from "./nonfunctionals";

export type Logger = (msg: string) => void
export function consoleLogger(msg: string) {
    console.log(msg)
};

export const addLogging = <From, To>(logger: Logger, msgFn: (from: From, to: To) => string) => (bizLogic: Func<From, To>): Func<From, To> => {
    return from => {
        const to = bizLogic((from))
        logger(msgFn(from, to))
        return to
    }
};