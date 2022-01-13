import { addMetrics } from "./metrics";

export function bizlogic(x: number) {return x + 10}
describe("addMetrics", () => {
        it("should decorate a bizlogic method and return what it did", () => {
            const fn = addMetrics<number, number>(name => {}, n => [`metric${n}`])(bizlogic)
            expect(fn(1)).toEqual(11)
        })
        it("should decorate a bizlogic method and call the putmetrics method with the name", () => {
            var metricLog: string[] = []
            const fn = addMetrics<number, number>(name => {metricLog = [...metricLog, name]}, n => [`metric${n}`])(bizlogic)
            expect(fn(1)).toEqual(11)
            expect(metricLog).toEqual('')
        })
    }
)