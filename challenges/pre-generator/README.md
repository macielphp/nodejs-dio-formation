# 🚀 Pre-Generator CLI

A **Node.js CLI (Command Line Interface)** project that brings together small **utility generators**, focused on hands-on learning of:

* Modern JavaScript (ES Modules)
* Array manipulation (`flatMap`, `reduceRight`)
* Environment variables
* Interactive terminal prompts
* QR Code generation
* Secure password generation

---

## 📌 Features

### 🔹 1. QR Code Generator

* Accepts a **link**
* Allows choosing the display type:

  * **Normal**
  * **Compact (Terminal)**
* Displays the QR Code directly in the terminal

### 🔹 2. Password Generator

* Generates random passwords based on:

  * Uppercase letters
  * Lowercase letters
  * Numbers
  * Special characters
* Fully configurable using **environment variables**

### 🔹 3. Advanced JavaScript Studies

Includes practical examples of:

* `flatMap()` → transform + flatten
* `reduceRight()` → reverse processing

---

## 🗂 Project Structure

```
challenges/
└── pre-generator/
    └── src/
        ├── index.js
        ├── services/
        │   ├── service.js
        │   ├── qr-code/
        │   │   ├── create.js
        │   │   └── handle.js
        │   └── password/
        │       ├── create.js
        │       ├── handle.js
        │       └── utils/
        │           └── permitted-characters.js
        └── prompt/
            ├── prompt-main.js
            └── prompt-qrcode.js
```

---

## ⚙️ Technologies Used

* **Node.js**
* **prompt** – terminal interaction
* **chalk** – console text styling
* **qrcode-terminal** – QR Code generation in terminal
* **ES Modules** (`import / export`)

---

## 🔐 Environment Variables Configuration

Create a `.env` file at the project root:

```env
PASSWORD_LENGTH=12
UPPERCASE_LETTERS=true
LOWERCASE_LETTERS=true
NUMBERS=true
SPECIAL_CHARACTERS=true
```

💡 You can enable or disable any character group.

---

## ▶️ How to Run the Project

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the project

```bash
node src/index.js
```

---

## 🧭 Main Menu

When starting, the CLI will show a menu similar to:

```
1 - Generate QR Code
2 - Generate Password
```

Simply choose an option and follow the instructions.

---

## 🧠 Concepts Covered

* Code modularization
* Separation of concerns
* Pure functions
* Callbacks and async/await
* Practical use of environment variables
* Functional programming in JavaScript

---

## 📚 Project Purpose

This project is part of a series of **educational challenges**, focused on:

* Strengthening JavaScript fundamentals
* Practicing Node.js outside the frontend
* Building simple and reusable tools
* Developing architectural thinking

---

## ✨ Possible Improvements

* Export QR Code as image
* Stronger input validation
* Token / UUID generator
* Publish as an npm package
* Add automated tests

---

## 👨‍💻 Author

Project developed for continuous learning and improvement in **JavaScript and Node.js**.

