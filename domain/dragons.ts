import { consoleLogger } from "../nonfunctionals/logging";
import { Attack, AttackResult, attackResult } from "./attack";

export const logger = consoleLogger


var timesBeenHit: number = 0
var timesKilled: number = 0

export interface Dragon {
    hitpoints: number
    alive: boolean
}
export function dragon(hitpoints: number, alive: boolean): Dragon {return ({ hitpoints, alive })}

export function isDead(d: Dragon) {return !d.alive}

export function originalAttack({ amount, dragon }: Attack) {
    try {
        if (amount <= 0 || isDead(dragon)) { return dragon}
        let newHitpoints = dragon.hitpoints - amount
        if (newHitpoints <= 0) {
            logger(`dragon was hit for ${amount} and is now DEAD!`)
            return { ...dragon, hitpoints: 0, alive: false }
        }
        timesBeenHit++
        logger(`dragon was hit for ${amount} and hitpoints are now ${newHitpoints}`)
        return { ...dragon, hitpoints: newHitpoints }

    } catch (e) {
        logger(`Unexpected error damaging ${dragon}  for ${amount} hitpoints $e`);
        throw e
    }
}





export const freshDragon: Dragon = dragon(1000, true)
