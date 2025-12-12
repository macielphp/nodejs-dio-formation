async function connectToDatabase(user, password) {
    if (user === process.env.USERDATABASE && password === process.env.PASSWORD) { console.log("sucessfully  connected") }
    else { console.log("Failed to connect.")} 
}

export default connectToDatabase;