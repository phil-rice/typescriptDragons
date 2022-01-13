import { composeValidators, logAndReturnInitialValue, Validate, validate, ValidateFailStrategy } from "./validate";


export function bizlogic(x: string) {return x + "_biz"}
function validator(n: string): Validate<string> { return inp => [inp + n]}
describe("validator", () => {
    it("should wrap a bizlogic method and if no validation errors, return the bizlogic result", () => {
        const illegalToFail: ValidateFailStrategy<string, string> = () => fail("shouldnt be called")
        expect(validate(illegalToFail, () => [])(bizlogic)("one")).toEqual("one_biz")
    })


    it("should wrap a bizlogic method and if fail, return the validate fail result", () => {
        const fail: ValidateFailStrategy<string, string> = (from, errors) => from + ":" + errors.join(",")
        expect(validate(fail, () => ["e1", "e2"])(bizlogic)("one")).toEqual("one:e1,e2")
    })

    it("should compose validators", () => {
        expect(composeValidators(validator("1"), validator("2"))("inp")).toEqual(["inp1", "inp2"])
    })
})

describe("logAndReturnInitialValue", () => {
    it("should logAndReturnInitialValue", () => {
        var remembered: string[] = []
        const fail = logAndReturnInitialValue<string, string>(
            msg => {remembered = [...remembered, msg]},
            (from, errors) => from + "=>" + errors.join(","),
            (from, errors) => from + ":" + errors.join(","))
        expect(fail("value", ["e1", "e2"])).toEqual("value:e1,e2")
        expect(remembered).toEqual(["value=>e1,e2"])

    })

})