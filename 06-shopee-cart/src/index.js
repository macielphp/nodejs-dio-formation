import createItem from './services/item.js'
import * as cartService from './services/cart.js'

const myCart = []
const myWishList = []

const item1 = await createItem('Mouse', 10, 2)
const item2 = await createItem('keyboard', 15, 3)
const item3 = await createItem('mousepad', 12, 2)

async function display() {
    await cartService.addItem(myCart, item1)
    await cartService.addItem(myCart, item2)
    await cartService.addItem(myCart, item3)

    await cartService.removeItem(myCart, item2)
    await cartService.removeItem(myCart, item2)
    
    await cartService.addItem(myWishList, item3)
    await cartService.addItem(myWishList, item3)

    cartService.displayCart(myCart)

}
await display()  // Also await the display call
