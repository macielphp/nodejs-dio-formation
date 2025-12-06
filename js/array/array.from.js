const listTask = ['call John', 'meet Jonson', 'book a table']

const objTask = [
    {
        task: listTask[0],
        to: 'Maciel',
        when: '2025/11/23 - 04:30PM',
        where: 'silent place'
    },
    {
        task: listTask[1],
        to: 'Carl',
        when: '2025/11/23 - 06:00PM',
        where: 'restaurant Plyning'
    },
    {
        task: listTask[2],
        to: 'Jim',
        when: '2025/11/23 - 01:21PM',
        where: 'restaurant Juass'
    },

]

console.log(objTask)

const rss = Array.from(objTask)
console.log(rss)


// Array.from turns ANY iterable (like strings, Sets, Maps) into a real Array.
const ar1 = Array.from(new Set([1, 1, 2, 3, 2])); 
console.log(ar1)
// [1, 2]

// Array.from can apply a mapping function to each element while creating the array.
const mult1 = Array.from([1, 2, 3], n => n * 10);
console.log(mult1)
// [10, 20, 30]

// Array.from can generate arrays using only a length property.
const clo1 = Array.from({ length: 4}, (_, i) => i)
console.log(clo1)

// Array.from always creates a NON-sparse array (no holes).
const clo2 = Array.from({ length: 3 })
console.log(clo2)