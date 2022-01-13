import {} from "./errorhandling";
import { Func } from "./nonfunctionals";
import { addLogging } from "./logging";
import { addMetrics } from "./metrics";

export function bizlogic(x: number) {return x + 10}

describe("addMetrics", () => {
    it("should decorate a bizlogic method and return the same result", () => {
        const fn = addMetrics<number, number>(m => {}, (f, t) => [])(bizlogic)
        expect(fn(1)).toEqual(11)
    })
    it("should decorate a bizlogic method and log the result", () => {
        var metrics: string[] = []
        function putMetrics(name: string) {metrics = [...metrics, name]}
        const fn = addMetrics<number, number>(putMetrics,
            (f, t) => [`adding ${f}`, `to make ${t}`])(bizlogic)
        fn(1)
        fn(2)
        expect(metrics).toEqual(["adding 1", 'to make 11', "adding 2", 'to make 12'])
    })

})