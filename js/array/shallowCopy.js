// 1. 
const ingredientsList = ["noodles", { list: ["eggs", "flour", "water"] }];

// 2. Shallow copy. Share the same references, same values.
const ingredientsListCopy = Array.from(ingredientsList);
console.log(ingredientsListCopy);

// 3. Not equal in
console.log(`${ingredientsList == ingredientsListCopy}`)

// 4. Re-assigning the shallow, re-assigns the shallow copy as well and the inverse is true.
ingredientsListCopy[1].list = ["rice flour", "water"];
console.log(ingredientsList[1].list);
console.log(ingredientsListCopy[1].list)    

// -----------------------------------------------------

// 1. Re-assigning top-level properties does NOT affect the source
console.log('Re-assigning top-level properties does NOT affect the source')
const original = {
    name: 'John',
    address: {city: 'NYC'}
};

//2.  Shallow copy of original
const copy = {...original}

// 3. Change a top-level property
copy.name = 'Mary';

// 4. result
console.log(original.name)
console.log(copy.name)

// ------------------------------------------------------

// 1. Re-assigning NESTED object properties DOES affect the source
console.log('Re-assigning NESTED object properties DOES affect the source')

const original2 = {
  name: "John",
  address: { city: "NYC" }
};

const copy2 = { ...original2 };

// 2. Change a nested property
copy2.address.city = "Los Angeles";

// 3. Result    
console.log(original2.address.city); // "Los Angeles" → affected!
console.log(copy2.address.city);     // "Los Angeles"