import { Dragon, freshDragon } from "./dragons";


export const dragon900 = new Dragon(900, true)
export const dragon100 = new Dragon(100, true)
export const deadDragon = new Dragon(0, false)


describe("Dragon", () => {
    it("should start with 1000 hp and alive", () => {
        expect(freshDragon.alive).toBe(true);
        expect(freshDragon.hitpoints).toBe(1000);
    })

    it("should take damage and not die if the accumulated damage < 1000", () => {
        expect(freshDragon.damage(900)).toEqual(dragon100)
        expect(freshDragon.damage(100)).toEqual(dragon900)
    })

    it("should take damage  die if the accumulated damage >= 1000", () => {
        expect(freshDragon.damage(1000)).toEqual(deadDragon)
        expect(dragon100.damage(100)).toEqual(deadDragon)
        expect(dragon100.damage(101)).toEqual(deadDragon)
        expect(dragon100.damage(900)).toEqual(deadDragon)
        expect(deadDragon.damage(0)).toEqual(deadDragon)
        expect(deadDragon.damage(900)).toEqual(deadDragon)
    })
})

