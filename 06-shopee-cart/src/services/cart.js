

async function addItem(userCart, item) {
    userCart.push(item);

}

async function deleteItem(userCart, name) {
    const index = userCart.findIndex((item) => item.name === name);
    if (index != -1) {
        userCart.splice(index, 1)
    }
}

async function removeItem(userCart, item) {
    const indexFound = userCart.findIndex((p) => p.name === item.name )

    if (!indexFound) {
        console.log("Item não encontrado")
        return;
    }

    if (userCart[indexFound].quantity > 1) {
        userCart[indexFound].quantity -= 1
        userCart[indexFound].subtotal()
        return
    }

    if (userCart[indexFound].quantity == 1) {
        userCart.splice(indexFound, 1)
        return
    }
}

async function displayCart(userCart) {
    console.log("Shopee cart list: ")
    userCart.forEach((item, index) =>
        console.log(`${index}: ${item.name} - R$${item.price} - Qtde: ${item.quantity} - Subtotal: ${item.subtotal()}`)
    )
    const calculatedTotalPrice = await calculateTotal(userCart)
    console.log(`Total R$${calculatedTotalPrice}`)
}

async function calculateTotal(userCart) {
    return userCart.reduce((total, item) => total + item.subtotal(), 0)
}

export {
    addItem, deleteItem, removeItem, calculateTotal, displayCart
}