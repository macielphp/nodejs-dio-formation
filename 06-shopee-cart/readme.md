# 🛒 Shopee Cart

A Node.js shopping cart simulation project built with modern JavaScript (ES Modules) to demonstrate cart management operations.

## 📋 Features

- ✅ Add items to cart
- ✅ Remove items from cart
- ✅ Delete items completely
- ✅ Calculate cart total
- ✅ Display cart contents
- ✅ Manage wish lists

## 🚀 Technologies

- Node.js
- JavaScript ES6+ (ES Modules)
- Async/Await

## 📁 Project Structure

```
shopee-cart/
├── src/
│   ├── index.js
│   └── services/
│       ├── item.js
│       └── cart.js
└── README.md
```

## 🛠️ How to Run

1. Make sure you have Node.js installed (version 14+)

2. Clone the repository:
```bash
git clone <repository-url>
cd shopee-cart
```

3. Navigate to the src folder:
```bash
cd src
```

4. Run the project:
```bash
node index.js
```

## 📝 Main Functions

### Item Service (`item.js`)

- **`createItem(name, price, quantity)`**: Creates a new item object with automatic subtotal calculation

### Cart Service (`cart.js`)

- **`addItem(userCart, item)`**: Adds an item to the cart
- **`deleteItem(userCart, name)`**: Removes an item completely from the cart by name
- **`removeItem(userCart, item)`**: Decreases item quantity by 1 (removes if quantity = 1)
- **`calculateTotal(userCart)`**: Calculates the total value of all items in the cart
- **`displayCart(userCart)`**: Displays all cart items with details and total

## 💡 Usage Example

```javascript
import createItem from './services/item.js'
import * as cartService from './services/cart.js'

const myCart = []

// Create items
const item1 = await createItem('Mouse', 10, 2)
const item2 = await createItem('Keyboard', 15, 3)

// Add to cart
await cartService.addItem(myCart, item1)
await cartService.addItem(myCart, item2)

// Remove one unit
await cartService.removeItem(myCart, item2)

// Display cart
await cartService.displayCart(myCart)
```

## 📊 Expected Output

```
Shopee cart list:
0: Mouse - R$10 - Qtde: 2 - Subtotal: 20
1: Keyboard - R$15 - Qtde: 2 - Subtotal: 30
Total R$50
```

## ⚠️ Important Notes

### The `subtotal()` Method

The `subtotal()` method uses `this` to reference the current item properties:

```javascript
subtotal() {
    return this.price * this.quantity
}
```

This ensures the subtotal is recalculated dynamically when quantity changes.

### Async/Await Pattern

All functions are async to demonstrate modern JavaScript patterns, even though most operations are synchronous. This prepares the code for future database or API integrations.

## 🔧 Common Issues & Solutions

### Issue: `subtotal()` not updating after quantity change
**Solution**: Make sure you're using a regular function (not arrow function) for the `subtotal` method to properly bind `this`.

### Issue: "Cannot use import statement outside a module"
**Solution**: Add `"type": "module"` to your `package.json` or use `.mjs` file extension.

## 📚 Learning Objectives

This project demonstrates:
- ES6 Modules (import/export)
- Async/Await patterns
- Array manipulation methods
- Object creation and methods
- JavaScript closures and `this` binding

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available under the MIT License.

---

Made with ❤️ for learning Node.js