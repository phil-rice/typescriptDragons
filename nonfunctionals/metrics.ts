import { Func } from "./nonfunctionals";

export type PutMetrics = (s: string) => void

interface MetricsData {
    [name: string]: number
}
export var globalMetrics: MetricsData = {}
export const putMetricsInSingleton = (name: string) => {
    const current = globalMetrics[name]
    globalMetrics[name] = current ? current + 1 : 1
};
export const addMetrics = <From, To>(putMetrics: PutMetrics, nameFn: (f: From, t: To) => string[]) => (bizLogic: Func<From, To>): Func<From, To> => {
    if (!bizLogic) {throw new Error('bizlogic must be defined')}
    return from => {
        const result = bizLogic(from)
        nameFn(from, result).forEach(putMetrics)
        return result
    }
};