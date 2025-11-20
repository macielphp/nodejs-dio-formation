export default async function connectToDatabase(databaseName) {
    console.log('Se conectando ao banco de dados...' + databaseName)
}

async function disconnectDatabase() {
    console.log('Desconectando do banco de dados...')
}

export {
    connectToDatabase,
    disconnectDatabase
}