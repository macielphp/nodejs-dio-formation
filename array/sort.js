const employees = [
    { name: 'Alice', salary: 5000, age: 30 },
    { name: 'Bob', salary: 7000, age: 25 },
    { name: 'Carol', salary: 4500, age: 35 },
    { name: 'David', salary: 8500, age: 28 }
]

console.log('\Ascending order')
employees.sort((a, b) => a.salary - b.salary)
employees.forEach(e => console.log(`${e.name}: $${e.salary}`))

console.log('\nDescending order')
employees.sort((a, b) => b.salary - a.salary)
employees.forEach(e => console.log(`${e.name}: $${e.salary}`))

console.log('\nSort by name alphabetically')
employees.sort((a, b) => a.name.localeCompare(b.name))
employees.forEach(e => console.log(`${e.name}: $${e.salary}`))

// Ordenar por idade
console.log('\n🎂 By age (youngest first):')
employees.sort((a, b) => a.age - b.age)
employees.forEach(e => console.log(`${e.name}: ${e.age} years`))