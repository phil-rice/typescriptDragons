export type Func<From, To> = (f: From) => To
export type Decorator<From, To> = (bizLogic: Func<From, To>) => Func<From, To>

export const nonFunctionals = <From, To>(...nfs: Decorator<From, To>[]): Decorator<From, To> =>
    bizLogic => nfs.reduce((acc, nf) => nf(acc), bizLogic);