import connectToDatabase from './utils/database.js'
import { getDataFromApi } from './utils/api.js'
async function main() {
    connectToDatabase('prod')
    getDataFromApi()
}

main()

