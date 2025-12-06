import updatedEmployees from "./chapter3.js";

console.log('\nDepartment caos: employees get assigned to nested department arrays:')

const engeneering = [
    updatedEmployees.find(e => e.name === "Alice"),
    updatedEmployees.find(e => e.name === "Bob")
]

const marketing = [
    updatedEmployees.find(e => e.name === "Carol")
]

const sales = [
    updatedEmployees.find(e => e.name === "David"),
    updatedEmployees.find(e => e.name === "Emma")
]

const leadership = [
    updatedEmployees.find(e => e.name === "Founder Frank")
]

let departments = [engeneering, marketing, sales, leadership];
console.log(departments)

departments.forEach((dept, index) => {
    const names = dept.map(e => e.name)
    console.log(`Department ${index + 1}: [${names.join(', ')}]`)
})

console.log('\n--- Using flat() ---')
console.log('You need to create one master list, so you use flat():\n')

const allEmployees = departments.flat()

console.log('Master list after flat():')
allEmployees.forEach(e => {
    console.log(`- ${e.name} ($${e.salary})`)
})

console.log('\n-- Using concat() ---')
console.log('Alternative: merge departments with concat():\n')

const mergedDepartments = engeneering.concat(marketing, sales, leadership)

console.log('Merged list with concat():')
mergedDepartments.forEach(e => {
    console.log(`- ${e.name} ($${e.salary})`)
})

console.log('\n-- Bonus: Deep nesting example ---')

const deepDepartments = [
    [
        [updatedEmployees[0]], // Frank
        [updatedEmployees[1]]  // Alice
    ],
    [
        [updatedEmployees[2], updatedEmployees[3]] // Bob, Carol
    ]
]

console.log('Deep nested structure (2 levels):')
console.log('Before flat():', JSON.stringify(deepDepartments.map(d => d.map(dd => dd.map(e => e.name)))))

console.log('\nflat(1) - 1 level:', deepDepartments.flat(1).map(d => d.map(e => e.name)))
console.log('flat(2) - 2 levels:', deepDepartments.flat(2).map(e => e.name))
console.log('flat(Infinity) - all levels:', deepDepartments.flat(Infinity).map(e => e.name))


export default allEmployees
