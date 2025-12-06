// 
console.log('=== splice(start) ===')
let a1 = ['A', 'B', 'C', 'D', 'E'];
// starting at index 2, remove everything after it
let removed1 = a1.splice(2);
console.log('Modified Array:', a1); // ['A', 'B']
console.log('Removed Elements:', removed1); // ['C', 'D', 'E']

// 02) splice(start, deleteCount)
console.log('\n=== splice(start, deleteCount) ===')
let a2 = ['A', 'B', 'C', 'D', 'E'];
// Start at index 1, remove 3 items
let removed2 = a2.splice(1, 2)
console.log('Modified Array:', a2); // ['A', 'E']
console.log('Removed Elements:', removed2); // ['B', 'C', 'D']

// 3) splice(start, deleteCount, item1)
console.log("\n=== splice(start, deleteCount, item1) ===");
let a3 = ['A', 'B', 'C'];
// Start at index 1, remove 1 item, insert "x"
let removed3 = a3.splice(1, 1, 'x');
console.log('Modified Array:', a3); // ['A', 'x', 'C']
console.log('Removed Elements:', removed3); // ['B']

// 4) splice(start, deleteCount, item1, item2)
console.log("\n=== splice(start, deleteCount, item1, item2) ===");
let a4 = ['A', 'B', 'C', 'D'];
// Start at index 2, remove 1 item, insert "X" and "Y"
let removed4 = a4.splice(2, 1, 'x', 'y')
console.log('Modified Array:', a4); // ['A', 'B', 'x', 'y', 'D']
console.log('Removed Elements:', removed4); // ['C']

// 5) splice(start, deleteCount, item1, item2, ..., itemN)
console.log("\n=== splice(start, deleteCount, item1...itemN) ===");
let a5 = ['A', 'B', 'C'];
// Start at index 1, remove 2 items, insert many items
let removed5 = a5.splice(1, 2, 'X', 'Y', 'Z', 'W');
console.log('Modified Array:', a5); // ['A', 'X', 'Y', 'Z', 'W']
console.log('Removed Elements:', removed5); // ['B', 'C']
