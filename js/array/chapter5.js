import allEmployees from './chapter4.js'

console.log('Chapter 5: Performance Review Time')

console.log('\nYou need to **analyze the team:')

console.log(' `some()` - "Does anyone earn over $6k/month?"')
const over6k = allEmployees.some((e) => e.salary > 6000)
console.log(over6k)

console.log('📊 every() - "Has everyone been hired before 26/11/2025?')
const dateYesterday = new Date('2025-11-25')
const hiredBefore = allEmployees.every((employee) => employee.hired.getTime() < dateYesterday.getTime())
console.log(`Result: ${hiredBefore ? '✅ Yes, everyone!' : '❌ No, someone was hired after'}`)
console.log(`Checking date: ${dateYesterday.toLocaleDateString()}\n`)

console.log("\nWhat is the index of the employee Bob?")
const bobIndex = allEmployees.findIndex((e) => e.name === 'Bob')
console.log(`Bob's index is: ${bobIndex}`)

console.log('What is the total payroll?')
const totalPayroll = allEmployees.reduce((total, employee) => {
    return total + employee.salary
}, 0)

console.log(`Total: $${totalPayroll.toLocaleString()}/month`)
console.log(`Average: $${totalPayroll / allEmployees.length}/month`)

console.log("📊 Salary distribution:")
const distribution = allEmployees.reduce((acc, employee) => {
    const range = employee.salary >= 6000 ? 'High ($6k+)' : 'Standard ($5k)'
    acc[range] = (acc[range] || 0) + 1
    return acc
}, {})

Object.entries(distribution).forEach(([range, count]) => {
    console.log(`${range}: ${count} employee(s)`)
})

console.log(distribution)

export default allEmployees

