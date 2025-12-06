console.log("📚 Cenário 1: Gerar Variações de Produtos")
const products = [
    { name: 'T-shirt', basePrice: 20 },
    { name: 'Jeans', basePrice: 50 }
]

console.log('👕 Generate product variations (sizes):')
const variations = products.flatMap(product => {
    return [
        {...product, size: 'S', price: product.basePrice },
        {...product, size: 'M', price: product.basePrice + 5},
        {...product, size: 'L', price: product.basePrice + 10}
    ]
})

variations.forEach(v => {
    console.log(`- ${v.name} (${v.size}): $${v.price}`)
})

console.log("\n📚 Cenário 2: Criar Horários de Reuniões")
const teams = [
    { name: 'Engineering', days: ['Monday', 'Wednesday'] },
    { name: 'Marketing', days: ['Tuesday', 'Thursday'] }
]

console.log('📅 Generate meeting schedules for teams:')
const meetings = teams.flatMap(team => {
    return team.days.map(day => ({
        team: team.name,
        day: day,
        time: '10:00 AM'
    }))
})

meetings.forEach(m => {
    console.log(`   ${m.day} at ${m.time} - ${m.team}`)
})

console.log("\n📚 Cenário 3: Gerar URLs de Redes Sociais")
const users = [
    { username: 'gotin_dev'},
    { username: 'bob_design'}
]

console.log('🔗 Generate social media profile URLs:')
const socialProfiles = users.flatMap(user => [
    { username: user.username, platform: 'Twitter', url: `https://twitter.com/${user.username}`},
    { username: user.username, platform: 'LinkedIn', url: `https://linkedin.com/in/${user.username}`},
    { username: user.username, platform: 'Facebook', url: `https://facebook.com/${user.username}`}
])

socialProfiles.forEach(p => {
    console.log(`    ${p.username} - ${p.platform}: ${p.url}`)
})

console.log("\n📚 Cenário 4: Expandir Pedidos com Items")

const orders = [
    { orderId: 101, items: ['Pizza','Soda']},
    { orderId: 102, items: ['Burger','Fries', 'Coke']}
]
console.log('🍔 Expand orders into individual items:')
const expandedOrders = orders.flatMap(order => {
    return order.items.map(item => ({
        orderId: order.orderId, item: item
    }))
})

expandedOrders.forEach(eo => {
    console.log(`- Order #${eo.orderId}: ${eo.item}`)
})

console.log("\n📚 Cenário 5: Gerar Notificações por Canal")

const notifications = [
    { message: 'New message from John', priority: 'high' },
    { message: 'System update available', priority: 'low' }
]

console.log('🔔 Send notifications via multiple channels:')
const deliveries = notifications.flatMap(n => {
    const channels = n.priority === 'high' 
        ? ['email', 'sms', 'push']
        : ['email']

    return channels.map(c => ({
        message: n.message,
        channel: c,
        priority: n.priority
    }))
})

deliveries.forEach(d => {
    console.log(`   [${d.priority.toUpperCase()}] Send via ${d.channel}: ${d.message}`)
})

console.log('\n🔥 Comparação: map() vs flatMap()')
const data = [
    {name: 'Gotin', hobbies: ['Reading', 'Hiking']},
    {name: 'Bob', hobbies: ['Painting']}
]

// ❌ map() - retorna arrays aninhados
const withMap = data.map(person => {
    return person.hobbies.map(hobbie => ({ name: person.name, hobbie: hobbie}))
})
console.log(withMap)

console.log('\n// ✅ flatMap() - já achata automaticamente')
const withFlatMap = data.flatMap(person => {
    return person.hobbies.map(hobbie => ({ name: person.name, hobbie: hobbie}))
})

console.log(withFlatMap)