// destructuring? selected imports
const { getFullName } = require('./services/product.js')
// All imports
const product = require('./services/product.js')
const config = require('./services/config.js') 
const database = require('./services/database.js') 

async function main(){
    console.log('Ola meu nome é system')
    product.getFullName('408', 'mousepad')

    console.log(config.devArea)
    console.log(config.client)

    database.connectToDatabase('prod')
}

main()