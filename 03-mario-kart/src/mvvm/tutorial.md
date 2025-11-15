# 🏎️ Tutorial Completo: Construindo MVVM do Zero

## 📋 Índice
1. [Passo 1: Entendendo o Código Original](#passo-1)
2. [Passo 2: Criando o Model Básico](#passo-2)
3. [Passo 3: Testando o Model](#passo-3)
4. [Passo 4: Criando o ViewModel](#passo-4)
5. [Passo 5: Implementando Observer Pattern](#passo-5)
6. [Passo 6: Criando a View](#passo-6)
7. [Passo 7: Conectando Tudo](#passo-7)
8. [Passo 8: Código Final Completo](#passo-8)

---

## <a name="passo-1"></a>Passo 1: Entendendo o Código Original

### 🤔 Análise do Problema

Antes de refatorar, vamos identificar os problemas do código original:

```javascript
// ❌ PROBLEMAS:
// 1. Lógica de negócio misturada com apresentação (console.log)
// 2. Difícil de testar sem ver o console
// 3. Impossível trocar a interface (console por HTML)
// 4. Classe Race faz TUDO (viola Single Responsibility)
```

### 🎯 O que vamos fazer:

**SEPARAR EM 3 CAMADAS:**
- **Model**: Player + RaceModel (dados e regras)
- **ViewModel**: RaceViewModel (coordenação e lógica de apresentação)
- **View**: ConsoleView (apenas exibição)

---

## <a name="passo-2"></a>Passo 2: Criando o Model Básico

### 🏗️ Começando pelo Player (mais simples)

```javascript
// MODEL - Passo 2A: Player puro
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

// ✅ TESTE MANUAL:
const mario = new Player({
    id: 1, 
    name: "Mario", 
    velocity: 4, 
    maneuverability: 3, 
    power: 3
})

console.log(mario.name) // "Mario"
console.log(mario.velocity) // 4
mario.playerPoints = 5
mario.resetPoints()
console.log(mario.playerPoints) // 0
```

### 🎲 Criando o RaceModel (lógica de negócio)

```javascript
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
```

---

## <a name="passo-3"></a>Passo 3: Testando o Model

### 🧪 Adicionando método de cálculo testável

```javascript
// MODEL - Passo 3: Adicionar cálculo de resultado
class RaceModel {
    // ... métodos anteriores ...

    // Método puro que calcula o resultado baseado no modo
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

    // Método puro que determina o vencedor
    // Retorna: 0 (player1), 1 (player2), -1 (empate)
    determineRoundWinner(player1Result, player2Result) {
        if (player1Result > player2Result) return 0
        if (player2Result > player1Result) return 1
        return -1
    }
}

// ✅ TESTE MANUAL DETALHADO:
const mario = new Player({id: 1, name: "Mario", velocity: 4, maneuverability: 3, power: 3})
const model = new RaceModel([mario], ["Normal"])

// Teste 1: Modo Normal usa velocity
const result1 = model.calculateRoundResult(mario, "Normal", 5)
console.log(result1) // 9 (5 + 4 velocity)

// Teste 2: Modo Drift usa maneuverability
const result2 = model.calculateRoundResult(mario, "Drift", 3)
console.log(result2) // 6 (3 + 3 maneuverability)

// Teste 3: Determinar vencedor
console.log(model.determineRoundWinner(10, 8))  // 0 (player1 venceu)
console.log(model.determineRoundWinner(5, 8))   // 1 (player2 venceu)
console.log(model.determineRoundWinner(7, 7))   // -1 (empate)
```

### 🎓 **LIÇÃO IMPORTANTE:**
> O Model agora está **100% testável** sem precisar do console!
> Todos os métodos são **puros**: recebem input, retornam output, sem efeitos colaterais.

---

## <a name="passo-4"></a>Passo 4: Criando o ViewModel

### 🔄 ViewModel: A ponte entre Model e View

```javascript
// VIEWMODEL - Passo 4: Estrutura básica
class RaceViewModel {
    constructor(model) {
        this.model = model
    }

    // Método que coordena uma rodada completa
    playRound(roundNumber, players, mode) {
        const roundData = {
            round: roundNumber,
            mode: mode,
            players: []
        }

        // Jogador 1
        const dice1 = this.model.rollDice()
        const result1 = this.model.calculateRoundResult(players[0], mode, dice1)
        
        roundData.players.push({
            name: players[0].name,
            diceValue: dice1,
            attribute: this.getAttributeValue(players[0], mode),
            attributeName: this.getAttributeName(mode),
            total: result1
        })

        // Jogador 2
        const dice2 = this.model.rollDice()
        const result2 = this.model.calculateRoundResult(players[1], mode, dice2)
        
        roundData.players.push({
            name: players[1].name,
            diceValue: dice2,
            attribute: this.getAttributeValue(players[1], mode),
            attributeName: this.getAttributeName(mode),
            total: result2
        })

        // Determinar vencedor
        const winner = this.model.determineRoundWinner(result1, result2)
        roundData.winner = winner

        // Atualizar pontos
        if (winner === 0) {
            players[0].playerPoints += 1
        } else if (winner === 1) {
            players[1].playerPoints += 1
        }

        return roundData
    }

    getAttributeName(mode) {
        const names = {
            "Normal": "velocity",
            "Drift": "maneuverability",
            "Turbo": "power"
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

// ✅ TESTE MANUAL:
const mario = new Player({id: 1, name: "Mario", velocity: 4, maneuverability: 3, power: 3})
const luigi = new Player({id: 2, name: "Luigi", velocity: 3, maneuverability: 4, power: 4})
const model = new RaceModel([mario, luigi], ["Normal"])
const viewModel = new RaceViewModel(model)

const roundData = viewModel.playRound(1, [mario, luigi], "Normal")
console.log(roundData)
// {
//   round: 1,
//   mode: "Normal",
//   players: [...],
//   winner: 0 ou 1 ou -1
// }
```

### 🎓 **LIÇÃO IMPORTANTE:**
> O ViewModel **coordena** a lógica, mas não exibe nada!
> Ele retorna **dados estruturados** que qualquer View pode usar.

---

## <a name="passo-5"></a>Passo 5: Implementando Observer Pattern

### 📢 Por que Observer Pattern?

O ViewModel precisa **notificar** a View quando algo acontece, mas **sem conhecê-la diretamente**.

```javascript
// VIEWMODEL - Passo 5: Adicionar Observer Pattern
class RaceViewModel {
    constructor(model) {
        this.model = model
        this.observers = [] // Lista de observadores (Views)
    }

    // Qualquer View pode se inscrever
    subscribe(observer) {
        this.observers.push(observer)
    }

    // Notifica todos os observadores
    notify(event, data) {
        this.observers.forEach(observer => {
            observer.update(event, data)
        })
    }

    // Agora playRound notifica eventos
    playRound(roundNumber, players, mode) {
        // Notifica início da rodada
        this.notify('roundStarted', {
            round: roundNumber,
            mode: mode
        })

        // Jogador 1
        const dice1 = this.model.rollDice()
        const result1 = this.model.calculateRoundResult(players[0], mode, dice1)
        
        this.notify('playerRolled', {
            playerName: players[0].name,
            diceValue: dice1,
            attribute: this.getAttributeName(mode),
            attributeValue: this.getAttributeValue(players[0], mode),
            total: result1
        })

        // Jogador 2
        const dice2 = this.model.rollDice()
        const result2 = this.model.calculateRoundResult(players[1], mode, dice2)
        
        this.notify('playerRolled', {
            playerName: players[1].name,
            diceValue: dice2,
            attribute: this.getAttributeName(mode),
            attributeValue: this.getAttributeValue(players[1], mode),
            total: result2
        })

        // Determinar vencedor
        const winner = this.model.determineRoundWinner(result1, result2)
        
        if (winner === 0) {
            players[0].playerPoints += 1
            this.notify('roundWinner', { winner: players[0].name })
        } else if (winner === 1) {
            players[1].playerPoints += 1
            this.notify('roundWinner', { winner: players[1].name })
        } else {
            this.notify('roundTie', {})
        }
    }

    // Método auxiliar
    getAttributeName(mode) {
        const names = {
            "Normal": "velocity",
            "Drift": "maneuverability",
            "Turbo": "power"
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

// ✅ TESTE MANUAL com Observer simples:
const mockObserver = {
    update(event, data) {
        console.log(`Evento: ${event}`, data)
    }
}

const viewModel = new RaceViewModel(model)
viewModel.subscribe(mockObserver)

// Agora ao rodar playRound, veremos os eventos!
viewModel.playRound(1, [mario, luigi], "Normal")
```

### 🎓 **LIÇÃO IMPORTANTE:**
> Observer Pattern permite **desacoplamento total**!
> ViewModel não sabe quem está ouvindo, apenas envia eventos.

---

## <a name="passo-6"></a>Passo 6: Criando a View

### 🖥️ View: Apenas apresentação

```javascript
// VIEW - Passo 6: ConsoleView
class ConsoleView {
    constructor(viewModel) {
        this.viewModel = viewModel
        // Se inscreve para receber notificações
        this.viewModel.subscribe(this)
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

// ✅ TESTE MANUAL:
const view = new ConsoleView(viewModel)
// Agora quando rodar playRound, a view mostra automaticamente!
viewModel.playRound(1, [mario, luigi], "Normal")
```

### 🎓 **LIÇÃO IMPORTANTE:**
> A View é **passiva**! Ela apenas reage aos eventos do ViewModel.
> Trocar ConsoleView por HTMLView é só criar outra classe!

---

## <a name="passo-7"></a>Passo 7: Conectando Tudo

### 🔗 Adicionando método startRace no ViewModel

```javascript
// VIEWMODEL - Passo 7: Método completo de corrida
class RaceViewModel {
    // ... código anterior ...

    startRace(totalRounds) {
        // Seleciona jogadores
        const players = this.model.selectRandomPlayers()
        
        this.notify('raceStarted', {
            player1: players[0].name,
            player2: players[1].name
        })

        // Roda todas as rodadas
        for (let round = 1; round <= totalRounds; round++) {
            const mode = this.model.randomMode()
            this.playRound(round, players, mode)
        }

        // Finaliza a corrida
        if (players[0].playerPoints > players[1].playerPoints) {
            this.notify('raceFinished', {
                winner: players[0].name,
                points: players[0].playerPoints
            })
        } else if (players[1].playerPoints > players[0].playerPoints) {
            this.notify('raceFinished', {
                winner: players[1].name,
                points: players[1].playerPoints
            })
        } else {
            this.notify('raceTied', {})
        }

        // Reseta pontos
        players[0].resetPoints()
        players[1].resetPoints()
    }
}

// VIEW - Adicionar método de início
class ConsoleView {
    // ... código anterior ...

    startGame(rounds) {
        this.viewModel.startRace(rounds)
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
```

---

## <a name="passo-8"></a>Passo 8: Código Final Completo

### ✅ Código final organizado e testado

```javascript
// ============================================
// MODEL - Dados e Regras de Negócio
// ============================================

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

class RaceModel {
    constructor(players, modes) {
        this.players = players
        this.modes = modes
    }

    rollDice() {
        return Math.floor(Math.random() * 6) + 1
    }

    randomMode() {
        const randomIndex = Math.floor(Math.random() * this.modes.length)
        return this.modes[randomIndex]
    }

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

// ============================================
// VIEWMODEL - Lógica de Apresentação
// ============================================

class RaceViewModel {
    constructor(model) {
        this.model = model
        this.observers = []
    }

    subscribe(observer) {
        this.observers.push(observer)
    }

    notify(event, data) {
        this.observers.forEach(observer => observer.update(event, data))
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

        if (players[0].playerPoints > players[1].playerPoints) {
            this.notify('raceFinished', {
                winner: players[0].name,
                points: players[0].playerPoints
            })
        } else if (players[1].playerPoints > players[0].playerPoints) {
            this.notify('raceFinished', {
                winner: players[1].name,
                points: players[1].playerPoints
            })
        } else {
            this.notify('raceTied', {})
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
            this.notify('roundWinner', { winner: players[0].name })
        } else if (winner === 1) {
            players[1].playerPoints += 1
            this.notify('roundWinner', { winner: players[1].name })
        } else {
            this.notify('roundTie', {})
        }
    }

    getAttributeName(mode) {
        const names = {
            "Normal": "velocity",
            "Drift": "maneuverability",
            "Turbo": "power"
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

// ============================================
// VIEW - Interface do Usuário
// ============================================

class ConsoleView {
    constructor(viewModel) {
        this.viewModel = viewModel
        this.viewModel.subscribe(this)
    }

    update(event, data) {
        switch(event) {
            case 'raceStarted':
                console.log("Bem-vindo ao Mario Kart!")
                console.log(`👥 Jogadores: ${data.player1} vs ${data.player2} 👥`)
                console.log("⏲ The race started! ⏲")
                break

            case 'roundStarted':
                console.log("-----------------------")
                console.log(`🏁 Round ${data.round} 🏁`)
                console.log(`🚷 Mode: ${data.mode} 🚷`)
                break

            case 'playerRolled':
                console.log(`${data.playerName} rolled ${data.diceValue} + ${data.attributeValue}(${data.attribute}) = ${data.total}`)
                break

            case 'roundWinner':
                console.log(`🏆 ${data.winner} won this round! 🏆`)
                break

            case 'roundTie':
                console.log("It's a tie! No points awarded.")
                break

            case 'raceFinished':
                console.log("-----------------------")
                console.log(`🎉🎉 ${data.winner} wins with ${data.points} points! 🎉🎉`)
                break

            case 'raceTied':
                console.log("-----------------------")
                console.log("It's a tie! No big winner.")
                break
        }
    }

    startGame(rounds) {
        this.viewModel.startRace(rounds)
    }
}

// ============================================
// MAIN - Inicialização
// ============================================

const main = () => {
    const players = [
        new Player({id: 1, name: "Mario", velocity: 4, maneuverability: 3, power: 3}),
        new Player({id: 2, name: "Luigi", velocity: 3, maneuverability: 4, power: 4}),
        new Player({id: 3, name: "Peach", velocity: 3, maneuverability: 4, power: 2}),
        new Player({id: 4, name: "Donkey Kong", velocity: 2, maneuverability: 3, power: 5}),
        new Player({id: 5, name: "Bowser", velocity: 5, maneuverability: 2, power: 5}),
        new Player({id: 6, name: "Yoshi", velocity: 2, maneuverability: 4, power: 3})
    ]

    const model = new RaceModel(players, ["Normal", "Turbo", "Drift"])
    const viewModel = new RaceViewModel(model)
    const view = new ConsoleView(viewModel)

    view.startGame(5)
}

main()
```

---

## 🎯 Resumo do Processo Mental

### 1️⃣ **Identificar Responsabilidades**
- O que são dados? → Model
- O que é coordenação? → ViewModel  
- O que é apresentação? → View

### 2️⃣ **Começar pelo Model**
- Criar classes de dados puros
- Métodos sem efeitos colaterais
- Testar cada método isoladamente

### 3️⃣ **Criar o ViewModel**
- Coordenar a lógica de negócio
- Transformar dados para apresentação
- Implementar Observer Pattern

### 4️⃣ **Criar a View**
- Apenas apresentação
- Reagir aos eventos do ViewModel
- Zero lógica de negócio

### 5️⃣ **Testar Cada Camada**
- Model: testes unitários
- ViewModel: testes de integração
- View: testes de interface

---

## 🚀 Próximos Passos

Agora você pode:
- ✅ Criar uma HTMLView sem mudar nada no Model/ViewModel
- ✅ Adicionar testes unitários facilmente
- ✅ Expandir funcionalidades de forma organizada
- ✅ Trocar a persistência de dados
- ✅ Adicionar multiplayer online

**A arquitetura está pronta para escalar! 🏎️💨**

Gerado por: Claude.