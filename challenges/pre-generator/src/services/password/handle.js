import permittedCharacters from "./utils/permitted-characters";

async function handle() {
    let characters = [];
    let password = '';
    
    const passwordlength = process.env.PASSWORD_LENGTH
    characters = permittedCharacters()
    console.log('characters', characters)
    for (let i = 0; i < passwordlength; i++) {
        const index = Math.floor(Math.random() * characters.length)
        password += characters[index]
        console.log('password index value', password)
    }
    return password
 
}

export default handle