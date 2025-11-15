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

class RaceViewModel {
    constructor(model) {
        this.model = model
        this.observers = []
    }
        
    subscribe(observers) {
        this.observers.push(observers)
    }

    notify(event, data) {
        this.observers.forEach(observer => {
            observer.update(event, data)
        })
    }

    playRound(roundNumber, players, mode) {
        this.notify('roundStarted', {
            round: roundNumber,
            mode: mode
        })

        const dice1 = this.model.rollDice()
        const result1 = this.model.calculateRoundResult(players[0], mode, dice1)
        
        this.notify('playerRolled', {
            playerName: players[0].name,
            diceValue: dice1,
            attribuite: this.getAttribuiteName(mode),
            attribuiteValue: this.getAttribuiteValue(players[0], mode),
            total: result1
        })
        
        const dice2 = this.model.rollDice()
        const result2 = this.model.calculateRoundResult(players[1], mode, dice2)

        this.notify('playerRolled', {
            playerName: players[1].name,
            diceValue: dice2,
            attribuite: this.getAttribuiteName(mode),
            attribuiteValue: this.getAttribuiteValue(players[1], mode),
            total: result2
        })

        const winner = this.model.determineRoundWinner(result1, result2)

        if (winner === 0) {
            players[0].playersPoints += 1
            this.notify('playerWon', {winner: players[0].name})
        } else if (winner === 1) {
            players[1].playersPoints += 1
            this.notify('roundWinner', {winner: players[1].name})
        } else {
            this.notify('roundTie', {})
        }
    }

    getAttribuiteName(mode) {
        const names = {
            "Normal": "velocity",
            "Drift": "maneuverability",
            "Turbo": "power",
        }
        return names[mode]
    }

    getAttribuiteValue(player, mode) {
        switch(mode) {
            case "Normal": return player.velocity
            case "Drift": return player.maneuverability
            case "Turbo": return player.power
        }
    }
}

const mockObserver = {
    update(event, data) {
        console.log(`Evento: ${event}`, data)
    }
}
const mario = new Player({ id: 1, name: "Mario", velocity: 4, maneuverability: 3, power: 3})
const luigi = new Player({ id: 2, name: "Luigi", velocity: 3, maneuverability: 4, power: 4})
const model = new RaceModel([mario, luigi], ["Normal"])
const viewModel = new RaceViewModel(model)
viewModel.subscribe(mockObserver)

viewModel.playRound(1, [mario, luigi], "Normal")