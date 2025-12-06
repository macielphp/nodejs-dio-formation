// const tickets = [
//     { id: 1, priority: 'high', status: 'open' },
//     { id: 2, priority: 'low', status: 'closed' },
//     { id: 3, priority: 'high', status: 'open' },
//     { id: 4, priority: 'medium', status: 'open' },
//     { id: 5, priority: 'high', status: 'closed' },
//     { id: 6, priority: 'low', status: 'open' }
// ]

// console.log("Tickets by priority:")
// const byPriority = tickets.reduce((acc, ticket) => {
//     const priority = ticket.priority === "high" ? "🔴 High" : ticket.priority === "medium" ? "🟡 Medium" : "🟢 Low"
//     acc[priority] = (acc[priority] || 0) + 1
//     return acc
// }, {})

// Object.entries(byPriority).forEach(([priority, count]) => {
//     console.log(`${priority}: ${count} ticket(s)`)
// })

// ----------------------------------------------------

// const movies = [
//     { title: 'Inception', genre: 'Sci-Fi', rating: 8.8 },
//     { title: 'The Notebook', genre: 'Romance', rating: 7.8 },
//     { title: 'Interstellar', genre: 'Sci-Fi', rating: 8.6 },
//     { title: 'Titanic', genre: 'Romance', rating: 7.9 },
//     { title: 'The Matrix', genre: 'Sci-Fi', rating: 8.7 },
//     { title: 'Avengers', genre: 'Action', rating: 8.0 }
// ]

// console.log('Movies by genre:')
// const byGenre = movies.reduce((acc, genre) => {
//     const genreName = genre.genre === "Sci-Fi" ? "👽 Sci-Fi" : genre.genre === "Romance" ? "❤️ Romance" : "💥 Action"
//     acc[genreName] = (acc[genreName] || 0) + 1
//     return acc
// }, {})

// Object.entries(byGenre).forEach(([genre, count]) => {
//     console.log(`${genre}: ${count} movie(s)`)
// })

// ----------------------------------------------------

// const courses = [
//     { name: 'HTML Basics', level: 'beginner', hours: 10 },
//     { name: 'React Advanced', level: 'advanced', hours: 40 },
//     { name: 'CSS Fundamentals', level: 'beginner', hours: 15 },
//     { name: 'Node.js API', level: 'intermediate', hours: 30 },
//     { name: 'JavaScript Pro', level: 'advanced', hours: 50 },
//     { name: 'Git Basics', level: 'beginner', hours: 5 }
// ]

// console.log('Courses by difficulty:')

// console.log('📚 Courses by difficulty:')
// const byDifficulty = courses.reduce((acc, course) => {
//     const level = course.level === 'beginner' ? '🌱 Beginner' :
//                   course.level === 'intermediate' ? '🌿 Intermediate' : '🌳 Advanced'
    
//     acc[level] = (acc[level] || 0) + 1
//     return acc
// }, {})

// Object.entries(byDifficulty).forEach(([level, count]) => {
//     console.log(`  ${level}: ${count} courses`)
// })

//  ----------------------------------------------------

// console.log("1. Simple aggregation with reduce:")
// console.log('Simple aggregation with reduce:')
// const products = [
//     { name: 'Laptop', price: 1220},
//     { name: 'Phone', price: 500},
//     { name: 'Tablet', price: 300},
//     { name: 'Monitor', price: 200},
//     { name: 'Headphones', price: 150}
// ]

// console.log('Total inventory value:')
// const totalValue = products.reduce((total, product) => {
//     return  product.price + total
// }, 0)

// console.log(`$${totalValue.toLocaleString()}`)

// const total = products.reduce((sum, p) => sum + p.price, 0)

// console.log(`$${total.toLocaleString()}`)

// ----------------------------------------------------

// console.log("2. Finding extremes with reduce:")
// const employees = [
//     { name: "John", salary: 4000 },
//     { name: "Jane", salary: 5500 },
//     { name: "Bob", salary: 7000 },
//     { name: "Alice", salary: 6000 },
//     { name: "Mike", salary: 4500 }
// ]

// console.log("Employee salary distribution:")
// const highest = employees.reduce((max, employee) => {
//     return employee.salary > max.salary ? employee : max
// })

// console.log(`${highest.name} has the highest salary: $${highest.salary}`)
// console.log(highest)
// console.log("\n📉 Lowest salary:")
// const lowest = employees.reduce((min, employee) => {
//     return employee.salary < min.salary ? employee : min
// })

// console.log(`${lowest.name} has the lowest salary: $${lowest.salary}`)

// const maxSalary = employees.reduce((max, emp) => 
//     emp.salary > max ? emp.salary : max, 0)
// console.log(`\nMax value: $${maxSalary}`)

// -----------------------------------------------------

// console.log("3. Collecting specific data with reduce:")
// const users = [
//     { id: 1, name: 'Alice', active: true },
//     { id: 2, name: 'Bob', active: false },
//     { id: 3, name: 'Carol', active: true },
//     { id: 4, name: 'David', active: true }
// ]

// console.log('Active users names:')

// const activeNames = users.reduce((names, user) => {
//     if (user.active) {
//         names.push(user.name)
//     }
//     return names
// }, []) // Inicia com array vazio [] 

// console.log(activeNames)

// -----------------------------------------------------

// console.log("4. Transforming arrats into categorized objects:")

// const products = [
//     { id: 101, name: 'Laptop', price: 1200 },
//     { id: 102, name: 'Phone', price: 800 },
//     { id: 103, name: 'Tablet', price: 500 }
// ]

// console.log('🗂️ Products indexed by ID:')
// const productsById = products.reduce((obj, product) => {
//     obj[product.id] = product
//     return obj
// }, {})

// console.log(productsById)

// // Acesso rápido:
// console.log(productsById[102].price) // '800'

// -----------------------------------------------------

// console.log("5. Count occurrences of values in an array:")

// const votes = ['Alice', 'Bob', 'Alice', 'Carol', 'Alice', 'Bob', 'Alice']

// console.log('Vote count:')
// const voteCount = votes.reduce((count, name) => {
//     count[name] = (count[name] || 0) + 1
//     return count
// }, {})

// console.log(voteCount)

// // Find the winner:
// const winner = Object.entries(voteCount).reduce((top, [name, votes]) => {
//     return votes > top.votes ? { name, votes } : top
// }, { name: '', votes: 0 })

// console.log(`Winner: ${winner.name} with ${winner.votes} votes`)

// -----------------------------------------------------

// console.log("6. Flatten nested arrays with reduce:")
// const departments = [
//     ['Alice', 'Bob'],
//     ['Carol'],
//     ['David', 'Emma', 'Frank']
// ]
// console.log('All employees(flattened):')
// const allEmployees = departments.reduce((flat, dept) => {
//     return flat.concat(dept)
// }, [])

// console.log(allEmployees)

// // With spread operator:
// const flattened = departments.reduce((acc, dept) => [...acc, ...dept], [])
// console.log(flattened)

// -----------------------------------------------------

const students = [
    { name: 'Alice', grade: 'A', age: 20 },
    { name: 'Bob', grade: 'B', age: 22 },
    { name: 'Carol', grade: 'A', age: 21 },
    { name: 'David', grade: 'C', age: 23 },
    { name: 'Emma', grade: 'A', age: 20 }
]

console.log('🎓 Students grouped by grade:')
const byGrade = students.reduce((groups, student) => {
    const grade = student.grade

    // Create array for grade if not exists
    if (!groups[grade]) {
        groups[grade] = []
    }

    // add student to respective grade array
    groups[grade].push(student)

    return groups
}, {})

console.log(byGrade)
Object.entries(byGrade).forEach(([grade, students]) => {
    console.log(`\n Grade ${grade}:`)
    students.forEach(s => console.log(`    - ${s.name} (${s.age} years old)`))
})