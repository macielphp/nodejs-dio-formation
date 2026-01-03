import emailAliases from './chapter7.js';

console.log("\nChapter 8: Practical Applications\n");
console.log(' `join(', ')` to create CSV lists:')
const csvList = emailAliases.map(alias => alias.email).join(', ');
console.log(csvList);