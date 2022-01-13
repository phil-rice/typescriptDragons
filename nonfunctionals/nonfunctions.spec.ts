import { Decorator, nonFunctionals } from "./nonfunctionals";

export function bizlogic(x: string) {return x + "_biz"}
export function decorator(x: string): Decorator<string, string> { return raw => from => raw(from) + "_" + x}
describe("nonfunctions", () => {
    it("should compose multiple decorators", () => {
            let nfs = nonFunctionals(decorator("1"), decorator("2"), decorator("3"), decorator("4"));
            expect(nfs(bizlogic)("inp")).toEqual("inp_biz_1_2_3_4")
        }
    )

})