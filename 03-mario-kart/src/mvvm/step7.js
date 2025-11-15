// 03-mario-kart\src\mvvm\step6.js
class Player {
    constructor({id, name, velocity, maneuverability, power}) {
        this.id = id
        this.name = name
        this.velocity = velocity
        this.maneuverability = maneuverability
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
        let attribute = 0

        switch(mode) {
            case "Normal":
                attribute = player.velocity
                break
            case "Drift":
                attribute = player.maneuverability
                break
            case "Turbo":
                attribute = player.power
                break 
        }
        return diceRoll + attribute
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

    startRace(totalRounds) {
        const players = this.model.selectRandomPlayers()

        this.notify('raceStarted', {
            player1: players[0].name,
            player2: players[1].name
        })

        for (let round = 1; round <= totalRounds; round++) {
            const mode = this.model.randomMode()
            this.playRound(round, players, mode)
        }

        if (players[0].playerPoints  > players[1].playerPoints ) {
            this.notify('raceFinished', {
                winner: players[0].name,
                points: players[0].playerPoints 
            })
        } else if (players[1].playerPoints  > players[0].playerPoints ) {
            this.notify('raceFinished', {
                winner: players[1].name,
                points: players[1].playerPoints 
            }) 
        } else {
            this.notify('raceTie', {})
        }

        players[0].resetPoints()
        players[1].resetPoints()
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
            attribute: this.getAttributeName(mode),
            attributeValue: this.getAttributeValue(players[0], mode),
            total: result1
        })
        
        const dice2 = this.model.rollDice()
        const result2 = this.model.calculateRoundResult(players[1], mode, dice2)

        this.notify('playerRolled', {
            playerName: players[1].name,
            diceValue: dice2,
            attribute: this.getAttributeName(mode),
            attributeValue: this.getAttributeValue(players[1], mode),
            total: result2
        })

        const winner = this.model.determineRoundWinner(result1, result2)

        if (winner === 0) {
            players[0].playerPoints += 1
            this.notify('roundWinner', {winner: players[0].name})
        } else if (winner === 1) {
            players[1].playerPoints += 1
            this.notify('roundWinner', {winner: players[1].name})
        } else {
            this.notify('roundTie', {})
        }
    }

    getAttributeName(mode) {
        const names = {
            "Normal": "velocity",
            "Drift": "maneuverability",
            "Turbo": "power",
        }
        return names[mode]
    }

    getAttributeValue(player, mode) {
        switch(mode) {
            case "Normal": return player.velocity
            case "Drift": return player.maneuverability
            case "Turbo": return player.power
        }
    }
}

// VIEW - Passo 6: ConsoleView
class ConsoleView {
    constructor(viewModel) {
        this.viewModel = viewModel
        // Se inscreve para receber notificações
        this.viewModel.subscribe(this)
    }

    startGame(rounds) {
        this.viewModel.startRace(rounds)
    }

    // Método chamado pelo ViewModel
    update(event, data) {
        switch(event) {
            case 'raceStarted':
                this.showRaceStart(data)
                break

            case 'roundStarted':
                this.showRoundStart(data)
                break

            case 'playerRolled':
                this.showPlayerRoll(data)
                break

            case 'roundWinner':
                this.showRoundWinner(data)
                break

            case 'roundTie':
                this.showRoundTie()
                break

            case 'raceFinished':
                this.showRaceWinner(data)
                break

            case 'raceTied':
                this.showRaceTie()
                break
        }
    }

    // Métodos de apresentação
    showRaceStart(data) {
        console.log("Bem-vindo ao Mario Kart!")
        console.log(`👥 Jogadores: ${data.player1} vs ${data.player2} 👥`)
        console.log("⏲ The race started! ⏲")
    }

    showRoundStart(data) {
        console.log("-----------------------")
        console.log(`🏁 Round ${data.round} 🏁`)
        console.log(`🚷 Mode: ${data.mode} 🚷`)
    }

    showPlayerRoll(data) {
        console.log(`${data.playerName} rolled ${data.diceValue} + ${data.attributeValue}(${data.attribute}) = ${data.total}`)
    }

    showRoundWinner(data) {
        console.log(`🏆 ${data.winner} won this round! 🏆`)
    }

    showRoundTie() {
        console.log("It's a tie! No points awarded.")
    }

    showRaceWinner(data) {
        console.log("-----------------------")
        console.log(`🎉🎉 ${data.winner} wins with ${data.points} points! 🎉🎉`)
    }

    showRaceTie() {
        console.log("-----------------------")
        console.log("It's a tie! No big winner.")
    }
}

// ✅ TESTE COMPLETO:
const players = [
    new Player({id: 1, name: "Mario", velocity: 4, maneuverability: 3, power: 3}),
    new Player({id: 2, name: "Luigi", velocity: 3, maneuverability: 4, power: 4}),
    new Player({id: 3, name: "Peach", velocity: 3, maneuverability: 4, power: 2})
]

const model = new RaceModel(players, ["Normal", "Turbo", "Drift"])
const viewModel = new RaceViewModel(model)
const view = new ConsoleView(viewModel)

view.startGame(5) // Roda o jogo completo!