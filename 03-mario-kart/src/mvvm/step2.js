// Model
class Player {
    constructor({id, name, velocity, manueverability, power}) {
        this.id = id
        this.name = name
        this.velocity = velocity
        this.manueverability = manueverability
        this.power = power
        this.playerPoints = 0
    }

    resetPoints() {
        this.playerPoints = 0
    }
}

const mario = new Player({
    id: 1,
    name: "Mario",
    velocity: 4,
    manueverability: 3,
    power: 3
})

console.log(mario.name)
console.log(mario.velocity)
mario.playerPoints = 5
mario.resetPoints()
console.log(mario.playerPoints)
