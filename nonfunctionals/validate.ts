import {} from "./errorhandling";
import { Func } from "./nonfunctionals";


export type Validate<T> = (t: T) => string[]
export type ValidateFailStrategy<From, To> = (f: From, errors: string[]) => To

export const logAndReturnInitialValue = <From, To>(logger: (msg: string) => void,
                                                   msgFn: (f: From, errors: string[]) => string,
                                                   fail: (f: From, errors: string[]) => To): ValidateFailStrategy<From, To> => (from, errors) => {
    logger(msgFn(from, errors))
    return fail(from, errors)
};

export const need = <T>(fn: (t: T) => Boolean, msg: string): Validate<T> => t => fn(t) ? [] : [msg];

export const composeValidators = <T>(...vs: Validate<T>[]): Validate<T> => t => vs.flatMap(v => v(t));
export const validate = <From, To>(fail: ValidateFailStrategy<From, To>, validate: Validate<From>) => (bizLogic: Func<From, To>): Func<From, To> => {
    return from => {
        const errors = validate(from)
        return errors.length == 0 ? bizLogic(from) : fail(from, errors)
    }
};
