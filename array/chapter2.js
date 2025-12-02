import team from './chapter1.js'

console.log('\nChapter 2: Rapid Hiring')

console.log('\nThe startup grows! New employees join daily:')
console.log('Use "push" to add to the end and unshift to add to the start of the array: \n')
console.log("team.push('David', 'Emma');")
console.log("team.unshift('Founder Frank');")

team.push('David', 'Emma'); // Add to end
team.unshift('Founder Frank'); // Add to start

console.log(team)

export default team