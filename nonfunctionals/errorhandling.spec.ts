import { addErrorHandling, ErrorStrategy, logAndThrowES } from "./errorhandling";


export function bizlogicString(x: string) {return x + ".normal"}
const testErrorStrategyString: ErrorStrategy<string, string> = (e, from) => e + "." + from


export function bizlogicNumber(x: number) {return x + 10}
const testErrorStrategyNumber: ErrorStrategy<number, number> = (e, from) => from + 100

export function throwError<From, To>(toThrow: any): (from: From) => To {
    return from => { throw (toThrow)}

}
describe("AddErrorHandling", () => {

    it("returns a function that does what the bizlogic function does for strings", () => {
        const wrappedBizlogicStrings = addErrorHandling(testErrorStrategyString)(bizlogicString)
        expect(wrappedBizlogicStrings("one")).toEqual("one.normal")
    })

    it("returns a function that does what the bizlogic function does for numbers", () => {
            const wrappedBizlogicNumbers = addErrorHandling(testErrorStrategyNumber)(bizlogicNumber)
            expect(wrappedBizlogicNumbers(1)).toEqual(11)
        }
    )

    it("uses the error strategy if an error is thrown ", () => {
        const errorFn = throwError<number, number>(10)
        const wrapped = addErrorHandling(testErrorStrategyNumber)(errorFn)
        expect(wrapped(10)).toEqual(110)
    })
})

describe("logAndThrowES", () => {
    it("should log and throw the error", () => {
        var remembered: string = ""
        expect(() => logAndThrowES<string, string>(m => remembered = m)((e, from) => `${e} + ${from}`)("error", "from")).toThrow("error")
        expect(remembered).toEqual("error + from")

    })
})