import { composeValidators, logAndReturnInitialValue, need, validate, Validate, ValidateFailStrategy } from "../nonfunctionals/validate";
import { Func, nonFunctionals } from "../nonfunctionals/nonfunctionals";
import { addLogging, consoleLogger, Logger } from "../nonfunctionals/logging";
import { addErrorHandling, ErrorStrategy, logAndThrowES } from "../nonfunctionals/errorhandling";
import { addMetrics, putMetricsInSingleton } from "../nonfunctionals/metrics";
import { Dragon } from "./dragons";

export const logger = consoleLogger

export interface Attack {
    dragon: Dragon,
    amount: number
}
export interface AttackResult {
    dragon: Dragon,
    whatHappened: string[]
}
type WhatHappenedInAttack = 'dragon.hit' | 'dragon.died'
export const attackResult = (dragon: Dragon, whatHappened: WhatHappenedInAttack): AttackResult => ({ dragon, whatHappened: [whatHappened] });

const dragonMessage = {
    'dragon.hit': `dragon was hit for {0} and hitpoints are now {1}`,
    'dragon.died': 'dragon was hit for {0} and is now dead',
    'dragon.validation.damageMustBePositive': 'validation error: damage must be positive was {0}',
    'dragon.validation.dragonMustBeAlive': 'validation error: the dragon must be alive'
}

//Validation
export const damageMustBePositive: Validate<Attack> = need(({ amount }) => amount >= 0, 'dragon.validation.damageMustBePositive')
export const dragonMustBeAlive: Validate<Attack> = need(({ dragon }) => dragon.alive, 'dragon.validation.dragonMustBeAlive')

export const validateAttack = composeValidators<Attack>(damageMustBePositive, dragonMustBeAlive)
export const failValidateAttack = logAndReturnInitialValue<Attack, AttackResult>(consoleLogger,
    (a, errors) => errors.join(";"),
    (a, errors) => ({ dragon: a.dragon, whatHappened: errors }));

//errors
const attackErrorMessage = (e: any, { dragon, amount }: Attack) => `Unexpected error damaging ${dragon}  for ${amount} hitpoints ${e}`
export const attackErrorStrategy = logAndThrowES<Attack, AttackResult>(logger)(attackErrorMessage)

//logging
export function attackLogMessage(from: Attack, result: AttackResult): string {
    return result.whatHappened.map(w => {
        // @ts-ignore
        const pattern = dragonMessage[w]
        return pattern.replaceAll('{0}', from.amount.toString()).replaceAll('{1}', result.dragon.hitpoints.toString())
    }).join(";")
}
//metrics
let attacksMetricNameFn = (a: Attack, ar: AttackResult) => ar.whatHappened;

//bizlogic
export function rawAttack({ amount, dragon }: Attack): AttackResult {
    let hitpoints = dragon.hitpoints - amount
    return hitpoints <= 0 ?
        attackResult({ ...dragon, hitpoints: 0, alive: false }, 'dragon.died') :
        attackResult({ ...dragon, hitpoints }, 'dragon.hit')
}


//how to use the nonfunctionals
export const attack1: Func<Attack, AttackResult> =
                 addLogging(logger, attackLogMessage)(
                     addErrorHandling(attackErrorStrategy)(
                         validate(failValidateAttack, validateAttack)(
                             addMetrics(putMetricsInSingleton, attacksMetricNameFn)(
                                 rawAttack))))

//But a much nicer way
export const attackNonFunctionals = nonFunctionals<Attack, AttackResult>(
    addLogging(logger, attackLogMessage),
    addErrorHandling(attackErrorStrategy),
    validate(failValidateAttack, validateAttack),
    addMetrics(putMetricsInSingleton, attacksMetricNameFn)
)

export const attack2 = attackNonFunctionals(rawAttack)

//And better still. This can be used with any bizlogic method. Attack, Heal, Pick up item...doesn't matter
export function normalNonFunctionals<From, To>(
    logger: Logger,
    logMessage: (from: From, to: To) => string,
    errorStrategy: ErrorStrategy<From, To>,
    metricsNameFn: (f: From, t: To) => string[],
    failValidate: ValidateFailStrategy<From, To>,
    validator: Validate<From>
) {
    return nonFunctionals<From, To>(
        addLogging(logger, logMessage),
        addErrorHandling(errorStrategy),
        validate(failValidate, validator),
        addMetrics(putMetricsInSingleton, metricsNameFn)
    )
}
const attack3 = normalNonFunctionals<Attack, AttackResult>(logger,attackLogMessage, attackErrorStrategy, attacksMetricNameFn, failValidateAttack, validateAttack)

