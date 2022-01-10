function logger(msg: string) {
    //logs the message in some way not defined here
}

var timesBeenHit: number = 0
var timesKilled: number = 0
export class Dragon {
    hitpoints: number
    alive: boolean

    constructor(hitpoints: number, alive: boolean) {
        this.hitpoints = hitpoints;
        this.alive = alive;
    }

    isDead() {return !this.alive}
    damage(amount: number): Dragon {
        try {
            if (amount <= 0 || this.isDead()) { return this}
            let newHitpoints = this.hitpoints - amount
            if (newHitpoints <= 0) {
                logger(`dragon was hit for ${amount} and is now DEAD!`)
                timesKilled++
                return new Dragon(0, false)
            }
            timesBeenHit++
            logger(`dragon was hit for ${amount} and hitpoints are now ${newHitpoints}`)
            return new Dragon(newHitpoints, true)
        } catch (e) {
            logger(`Unexpected error damaging ${this}  for ${amount} hitpoints $e`);
            throw e
        }
    }
}

export const freshDragon = new Dragon(1000, true)
