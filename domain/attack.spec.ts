import { damageMustBePositive, dragonMustBeAlive } from "./attack";
import { freshDragon } from "./dragons";
import { deadDragon } from "./dragons.spec";

describe("attack", () => {
    describe("validator", () => {
        it("damageMustBePositive - valid", () =>
            expect(damageMustBePositive({ dragon: freshDragon, amount: 100 })).toEqual([]))
        it("damageMustBePositive - invalid", () =>
            expect(damageMustBePositive({ dragon: freshDragon, amount: -1 })).toEqual(["dragon.validation.damageMustBePositive"]))

        it("dragonMustBeAlive - valid", () =>
            expect(dragonMustBeAlive({ dragon: freshDragon, amount: 100 })).toEqual([]))
        it("dragonMustBeAlive - invalid ", () =>
            expect(dragonMustBeAlive({ dragon: deadDragon, amount: 100 })).toEqual(["dragon.validation.dragonMustBeAlive"]))
    })

})