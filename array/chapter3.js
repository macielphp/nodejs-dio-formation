import team from './chapter2.js'

console.log('\nChapter 3: The Data Upgrade')

console.log('\nHR upgrades the system to employee objects:')

let employees = team.map(name => ({
    name,
    hired: new Date(),
    salary: 5000
})) 

employees.forEach(e => {
    console.log(`\nName: ${e.name}`)
    console.log(`hired: ${e.hired}`)
    console.log(`salary: ${e.salary}`)

})

console.log('You need to give raises to certain people, so you use:\nfilter(): to find employees meeting criteria\nmap(): to create updated records with new salaries')

const updatedEmployees = employees.map(e => {
    if (e.name.includes('Founder') || e.name === 'David' || e.name === 'Emma') {
        return { ...e, salary: 7000 }
    }
    return e
})

console.log('\nAfter raises:')
updatedEmployees.forEach(e => {
    console.log(`${e.name}: $${e.salary}`)
})

export default updatedEmployees