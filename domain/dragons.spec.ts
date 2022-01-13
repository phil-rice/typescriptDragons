import { dragon, Dragon, freshDragon, originalAttack } from "./dragons";
import { attack1, attack2, attackResult } from "./attack";


export const dragon900 = dragon(900, true)
export const dragon100 = dragon(100, true)
export const deadDragon = dragon(0, false)

function doOriginalAttack(dragon: Dragon, amount: number) {return originalAttack({ dragon, amount })}
function doAttack1(dragon: Dragon, amount: number) {return attack1({ dragon, amount })}
function doAttack2(dragon: Dragon, amount: number) {return attack2({ dragon, amount })}
function doAttack3(dragon: Dragon, amount: number) {return attack2({ dragon, amount })}

const doAttack = doAttack1

describe("Dragon", () => {
    it("should start with 1000 hp and alive", () => {
        expect(freshDragon.alive).toBe(true);
        expect(freshDragon.hitpoints).toBe(1000);
    })

})
describe("original attack", () => {

    it("should take damage and not die if the accumulated damage < 1000", () => {
        expect(doOriginalAttack(freshDragon, 900)).toEqual(dragon100)
        expect(doOriginalAttack(freshDragon, 100)).toEqual(dragon900)
    })

    it("should take damage  die if the accumulated damage >= 1000", () => {
        expect(doOriginalAttack(freshDragon, 1000)).toEqual(deadDragon)
        expect(doOriginalAttack(dragon100, 100)).toEqual(deadDragon)
        expect(doOriginalAttack(dragon100, 101)).toEqual(deadDragon)
        expect(doOriginalAttack(dragon100, 900)).toEqual(deadDragon)
        expect(doOriginalAttack(deadDragon, 0)).toEqual(deadDragon)
        expect(doOriginalAttack(deadDragon, 900)).toEqual(deadDragon)
    })
})
describe("do attack with non functionals", () => {

    it("should take damage and not die if the accumulated damage < 1000", () => {
        expect(doAttack(freshDragon, 900)).toEqual(attackResult(dragon100, 'dragon.hit'))
        expect(doAttack(freshDragon, 100)).toEqual(attackResult(dragon900, 'dragon.hit'))
    })

    it("should take damage  die if the accumulated damage >= 1000", () => {
        expect(doAttack(freshDragon, 1000)).toEqual(attackResult(deadDragon, 'dragon.died'))
        expect(doAttack(dragon100, 100)).toEqual(attackResult(deadDragon, 'dragon.died'))
        expect(doAttack(dragon100, 101)).toEqual(attackResult(deadDragon, 'dragon.died'))
        expect(doAttack(dragon100, 900)).toEqual(attackResult(deadDragon, 'dragon.died'))
        expect(doAttack(deadDragon, 0)).toEqual({ dragon: deadDragon, whatHappened: ['dragon.validation.dragonMustBeAlive'] })
        expect(doAttack(deadDragon, 900)).toEqual({ dragon: deadDragon, whatHappened: ['dragon.validation.dragonMustBeAlive'] })
    })
})
