let gamesQuantity = 2;

let names = []

for (i = 0; i < gamesQuantity; i++) {
    if (i === 0) {
        names.push('SimCity')
    } else if (i === 1) {
        names.push('Prince of Persia')
    }
}

function displayAditionGamesSummary(gamesQuantity, names) {
    console.log(`\Was added '${gamesQuantity}' games: ${names.join(", ")} to gallery.`)
}

displayAditionGamesSummary(gamesQuantity, names)