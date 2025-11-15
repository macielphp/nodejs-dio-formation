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

    calculateRoundResult(player, mode, diceRoll) {
        let attribuite = 0

        switch(mode) {
            case "Normal":
                attribuite = player.velocity
                break
            case "Drift":
                attribuite = player.maneuverability
                break
            case "Turbo":
                attribuite = player.power
                break 
        }
        return diceRoll + attribuite
    }

    determineRoundWinner(player1Result, player2Result) {
        if (player1Result > player2Result) return 0
        if (player2Result > player1Result) return 1
        return -1
    }
}

const mario = new Player({id: 1, name: "Mario", velocity: 4, maneuverability: 3, power: 3})
const luigi = new Player({id: 2, name: "Luigi", velocity: 3, maneuverability: 4, power: 4})

const model = new RaceModel([mario, luigi], ["Normal"])

// Teste 1: Modo Normal usa velocity
const result1 = model.calculateRoundResult(mario, "Normal", 5)
console.log(result1)

const result2 = model.calculateRoundResult(mario, "Normal", 3)
console.log(result2)

const result3 = model.calculateRoundResult(luigi, "Normal", 2)
console.log(result3)

const result4 = model.calculateRoundResult(luigi, "Normal", 6)
console.log(result4)

console.log(model.determineRoundWinner(10, 8))
console.log(model.determineRoundWinner(8, 10))
console.log(model.determineRoundWinner(4, 4))