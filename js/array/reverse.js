const array = ["one", "two", "three"];
console.log("array:", array);
// Expected output: "array:" Array ["one", "two", "three"]

const reversed = array.reverse();
console.log("reversed:", reversed);
// Expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log("array:", array);
// Expected output: "array:" Array ["three", "two", "one"]

const toReversed = reversed.toReversed()
console.log("Re-reversed:", toReversed)