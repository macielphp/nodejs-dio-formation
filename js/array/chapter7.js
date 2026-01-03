import allEmployees from './chapter6.js';

console.log("\nChapter 7: Advanced Operations\n");

// -------------------------------------------------------
// 1. flatMap() — Transform + Flatten
// -------------------------------------------------------
console.log("🌍 Using flatMap() to generate international email aliases:");

const emailAliases = allEmployees.flatMap(emp => {
    return [ 
        {name: emp.name, email: `${emp.name.toLowerCase().replace(' ', '.')}@startup.com`},
        {name: emp.name, email: `${emp.name.toLowerCase().replace(' ', '.')}@global.com`}
    ];
});
console.log('Generated email aliases:');
emailAliases.forEach(alias => console.log(`${alias.name}: ${alias.email}`))

console.log("\n-------------------------------------------------------\n");

// -------------------------------------------------------
// 2. reduceRight() — Process from end
// -------------------------------------------------------

console.log("\n⏪ Using reduceRight() to list employees from last to first:");

const reversedOrder = allEmployees.reduceRight((acc, emp) => {
    acc.push(emp.name);
    return acc;
}, []);

console.log("Reverse-processed order:", reversedOrder);
console.log("\n-------------------------------------------------------\n");
console.log(emailAliases)

export default emailAliases;