import allEmployees from './chapter5.js'

console.log('Chapter 6: The Restructuring\n')

// Criar cópia para não modificar o original
const employeesCopy = [...allEmployees]

// Ordenar por salário (maior para menor)
console.log('📊 Sort by salary (highest first):')
employeesCopy.sort((a, b) => b.salary - a.salary)
employeesCopy.forEach(e => console.log(`  ${e.name}: $${e.salary}`))

// Pegar top 3
console.log('\n🏆 Top 3 highest salaries:')
const top3 = employeesCopy.slice(0, 3)
top3.forEach((e, index) => {
    console.log(`  ${index + 1}. ${e.name}: $${e.salary}`)
})

// Reverter ordem (menor para maior)
console.log('\n🔄 Reverse to lowest first:')
employeesCopy.reverse()
employeesCopy.forEach(e => console.log(`  ${e.name}: $${e.salary}`))

// Pegar 3 menores salários
console.log('\n📉 Bottom 3 lowest salaries:')
const bottom3 = employeesCopy.slice(0, 3)
bottom3.forEach((e, index) => {
    console.log(`  ${index + 1}. ${e.name}: $${e.salary}`)
})

export default allEmployees
