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

// MODEL - Passo 2B: RaceModel com métodos puros
class RaceModel {
    constructor(players, modes) {
        this.players = players
        this.modes = modes
    }

    // Método puro: não tem console.log, só retorna valor
    rollDice() {
        return Math.floor(Math.random() * 6) + 1
    }

    // Método puro: não tem console.log, só retorna valor
    randomMode() {
        const randomIndex = Math.floor(Math.random() * this.modes.length)
        return this.modes[randomIndex]
    }

    // Método puro: não tem console.log, só retorna array
    selectRandomPlayers() {
        const selected = []
        while (selected.length < 2) {
            const randomIndex = Math.floor(Math.random() * this.players.length)
            if (!selected.includes(this.players[randomIndex])) {
                selected.push(this.players[randomIndex])
            }
        }
        return selected
    }
}

// ✅ TESTE MANUAL:
const players = [
    new Player({id: 1, name: "Mario", velocity: 4, maneuverability: 3, power: 3}),
    new Player({id: 2, name: "Luigi", velocity: 3, maneuverability: 4, power: 4})
]

const model = new RaceModel(players, ["Normal", "Turbo", "Drift"])
console.log(model.rollDice()) // 1-6
console.log(model.randomMode()) // "Normal", "Turbo" ou "Drift"
console.log(model.selectRandomPlayers()) // Array com 2 jogadores