# 🏎️ Mario Kart Race Simulation

A simple **console-based Mario Kart simulation** written in JavaScript (ES6).
This project demonstrates **object-oriented programming**, **randomization**, and **game logic** using classes, loops, and functions.

---

## 🚀 Overview

Two random players are selected from a pool of six iconic Mario Kart characters.
They compete across multiple **rounds**, each with a **random mode** — Normal, Turbo, or Drift — where different attributes are tested.

The player who performs better in most rounds wins the race! 🏆

---

## 🧱 Project Structure

```bash
mario-kart/
├── main.js        # main simulation file
├── README.md      # documentation file
```

---

## ⚙️ How It Works

1. **Player Class**
   Represents a racer with attributes:

   * `id`
   * `name`
   * `velocity`
   * `maneuverability`
   * `power`
   * `playerPoints`

2. **Race Class**
   Controls the race logic:

   * Randomly selects **2 players** from the list
   * Simulates **N rounds**
   * Each round has a **random mode**:

     * `Normal` → tests `velocity`
     * `Drift` → tests `maneuverability`
     * `Turbo` → tests `power`
   * Players roll a virtual dice (1–6)
   * Attribute + dice result determines the round winner
   * At the end, total points decide the final champion

---

## 🎮 Example Output

```
Bem-vindo ao Mario Kart!
👥Jogadores selecionados: Bowser e Luigi👥
⏲The race started!⏲
-----------------------
🏁Round 1🏁
🚷Race Mode: Turbo 🚷
Bowser rolled a die with a value of 4 + 5(power) = 9
Luigi rolled a die with a value of 2 + 4(power) = 6
🏆Bowser won this round!🏆
-----------------------
🏁Round 2🏁
🚷Race Mode: Drift 🚷
Bowser rolled a die with a value of 3 + 2(maneuverability) = 5
Luigi rolled a die with a value of 6 + 4(maneuverability) = 10
🏆Luigi won this round!🏆
...
🎉🎉Bowser is the big winner with 3 playerPoints!🎉
```

---

## 🧩 Features

✅ Random player selection
✅ Dice-based attribute testing
✅ Multiple racing modes
✅ Round-by-round commentary
✅ Automatic winner declaration

---

## 🧠 Concepts Practiced

* **Classes and constructors**
* **Encapsulation**
* **Random number generation**
* **Control structures (loops, conditionals)**
* **Console output formatting**
* **Procedural and OOP integration**

---

## 🕹️ How to Run

1. Clone this repository or copy the code into a file named `main.js`
2. Run it using Node.js:

```bash
node main.js
```

3. Watch the race unfold in your terminal 🏁

---

## 👥 Characters

| Player      | Velocity | Maneuverability | Power |
| ----------- | -------- | --------------- | ----- |
| Mario       | 4        | 3               | 3     |
| Luigi       | 3        | 4               | 4     |
| Peach       | 3        | 4               | 2     |
| Donkey Kong | 2        | 3               | 5     |
| Bowser      | 5        | 2               | 5     |
| Yoshi       | 2        | 4               | 3     |

---

## 📜 License

This project is free to use and modify for learning purposes.
Made with ❤️ by **Maciel Alves** — inspired by **Felipe Aguiar (DIO)** lessons.

