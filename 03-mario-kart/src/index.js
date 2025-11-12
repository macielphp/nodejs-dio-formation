class Player {
    constructor({id, name, velocity, maneuverability, power, playerPoints}) {
        this.id = id
        this.name = name
        this.velocity = velocity
        this.maneuverability = maneuverability
        this.power = power
        this.playerPoints = playerPoints
    }
}
class Race {
    constructor(players, rounds, modes) {
        this.players = players
        this.rounds = rounds
        this.modes = modes
    }
    rollDice() {
        return Math.floor(Math.random() * 6) + 1
    }
    randomMode() {
        const randomIndex = Math.floor(Math.random() * this.modes.length)
        const mode = this.modes[randomIndex]
        return mode
    }
    whoWon(player1, player2) {
        if (player1.result > player2.result) {
            player1.playerPoints += 1
            player1.result = 0
            console.log(`🏆${player1.name} won this round!🏆`)
        } else if (player2.result > player1.result) {
            player2.playerPoints += 1
            player2.result = 0
            console.log(`🏆${player2.name} won this round!🏆`)
        } else {
            console.log("It's a tie! No points awarded.")
        }
    }
    points(duoPlayer, mode) {
        let tempPlayer1 = { 
            name: duoPlayer[0].name, 
            velocity:duoPlayer[0].velocity, 
            maneuverability: duoPlayer[0].maneuverability, 
            power: duoPlayer[0].power, 
            playerPoints: 0, 
            result: 0}
        let tempPlayer2 = { 
            name: duoPlayer[1].name, 
            velocity:duoPlayer[1].velocity, 
            maneuverability: duoPlayer[1].maneuverability, 
            power: duoPlayer[1].power, 
            playerPoints: 0, 
            result: 0}
        if (mode === "Normal") {
            for (let i = 0; i < 2; i++) {
                if (i === 0) {
                    const rollDiceNum = this.rollDice()
                    console.log(`${tempPlayer1.name} rolled a die with a value of ${rollDiceNum} + ${tempPlayer1.velocity}(velocity) = ${rollDiceNum + tempPlayer1.velocity}`)
                    tempPlayer1.result = rollDiceNum + tempPlayer1.velocity
                    continue
                } else if (i === 1) {
                    const rollDiceNum = this.rollDice()
                    console.log(`${tempPlayer2.name} rolled a die with a value of ${rollDiceNum} + ${tempPlayer2.velocity}(velocity) = ${rollDiceNum + tempPlayer2.velocity}`)
                    tempPlayer2.result = rollDiceNum + tempPlayer2.velocity
                }
            }
            this.whoWon(tempPlayer1, tempPlayer2)
        } else if (mode === "Drift") {
            for (let i = 0; i < 2; i++) {
                if (i === 0) {
                    const rollDiceNum = this.rollDice()
                    console.log(`${tempPlayer1.name} rolled a die with a value of ${rollDiceNum} + ${tempPlayer1.maneuverability}(maneuverability) = ${rollDiceNum + tempPlayer1.maneuverability}`)
                    tempPlayer1.result = rollDiceNum + tempPlayer1.maneuverability
                    continue
                } else if (i === 1) {
                    const rollDiceNum = this.rollDice()
                    console.log(`${tempPlayer2.name} rolled a die with a value of ${rollDiceNum} + ${tempPlayer2.maneuverability}(maneuverability) = ${rollDiceNum + tempPlayer2.maneuverability}`)
                }
            }
            this.whoWon(tempPlayer1, tempPlayer2)
        } else if (mode === "Turbo") {
            for (let i = 0; i < 2; i++) {
                if (i === 0) {
                    const rollDiceNum = this.rollDice()
                    console.log(`${tempPlayer1.name} rolled a die with a value of ${rollDiceNum} + ${tempPlayer1.power}(power) = ${rollDiceNum + tempPlayer1.power}`)
                    tempPlayer1.result = rollDiceNum + tempPlayer1.power
                    continue
                } else if (i === 1) {
                    const rollDiceNum = this.rollDice()
                    console.log(`${tempPlayer2.name} rolled a die with a value of ${rollDiceNum} + ${tempPlayer2.power}(power) = ${rollDiceNum + tempPlayer2.power}`)
                    tempPlayer2.result = rollDiceNum + tempPlayer2.power
                }
            }
            this.whoWon(tempPlayer1, tempPlayer2)
        }
      return {tempPlayer1, tempPlayer2}
    }

    randomDuoPlayers() {
        const selectedPlayers = []
        while (selectedPlayers.length < 2) {
            const randomIndex = Math.floor(Math.random() * this.players.length) 
            if (!selectedPlayers.includes(this.players[randomIndex])) {
                selectedPlayers.push(this.players[randomIndex])
            }
        }
        return selectedPlayers
    }
    start() {
        const duoPlayers = this.randomDuoPlayers()
        console.log(`👥Jogadores selecionados: ${duoPlayers[0].name} e ${duoPlayers[1].name}👥`)
        console.log("⏲The race started!⏲")
        for (let round = 1; round <= this.rounds; round++) {
            console.log("-----------------------")
            console.log(`🏁Round ${round}🏁`)
            let randomModeString = this.randomMode()
            console.log(`🚷Race Mode: ${randomModeString} 🚷`)
            const tempDuoPlayersPoints = this.points(duoPlayers, randomModeString)
            duoPlayers[0].playerPoints += tempDuoPlayersPoints.tempPlayer1.playerPoints
            duoPlayers[1].playerPoints += tempDuoPlayersPoints.tempPlayer2.playerPoints
            console.log("-----------------------")
        }
        if (duoPlayers[0].playerPoints > duoPlayers[1].playerPoints) {
            console.log(`🎉🎉${duoPlayers[0].name} is the big winner with ${duoPlayers[0].playerPoints} playerPoints!🎉`)
        } else if (duoPlayers[1].playerPoints > duoPlayers[0].playerPoints) {
            console.log(`🎉🎉${duoPlayers[1].name} is the big winner with ${duoPlayers[1].playerPoints} playerPoints!  🎉`)
        } else {
            console.log("It's a tie! No big winner this time.")
        }
        duoPlayers[0].playerPoints = 0
        duoPlayers[1].playerPoints = 0
    }
}

const main = () => {
    console.log("Bem-vindo ao Mario Kart!")
    const playerMario = new Player({
        id: 1, 
        name: "Mario", 
        velocity: 4, 
        maneuverability: 3, 
        power: 3, 
        playerPoints: 0
    })
    const playerLuigi = new Player({
        id: 2, 
        name: "Luigi", 
        velocity: 3, 
        maneuverability: 4, 
        power: 4,
        playerPoints: 0
    })
    const playerPeach = new Player({
        id: 3, 
        name: "Peach", 
        velocity: 3, 
        maneuverability: 4, 
        power: 2,
        playerPoints: 0
    })
    const playerDonkeyKong = new Player({
        id: 4, 
        name: "Donkey Kong", 
        velocity: 2, 
        maneuverability: 3, 
        power: 5,
        playerPoints: 0
    })
    const playerBowser = new Player({
        id: 5, 
        name: "Bowser", 
        velocity: 5, 
        maneuverability: 2, 
        power: 5,
        playerPoints: 0
    })
    const playerYoshi = new Player({
        id: 6, 
        name: "Yoshi", 
        velocity: 2, 
        maneuverability:4, 
        power: 3,
        playerPoints: 0
    })
    const playersArray = [playerMario, playerLuigi, playerPeach, playerDonkeyKong, playerBowser, playerYoshi]
    const race = new Race(playersArray, 5, ["Normal", "Turbo", "Drift"],
    )
    race.start()
}
main()