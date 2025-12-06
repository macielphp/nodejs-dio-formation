console.log('Chapter 1\n')

console.log("You launch a startup with a simple list of founder names")
let team = ["Alice", "Bob", "Carol"]

console.log('\nYou need to **send welcome emails to everyone**, so you use:')
console.log('"forEach()" to iterate and send emails\n')

team.forEach((member) => {
    console.log(`${member}, welcome to the team!`)
})

export default team