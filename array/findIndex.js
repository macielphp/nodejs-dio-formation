elements = [
    {
        id: 1,
        age: 15,
    },
    {
        id: 2,
        age: 43,
    },
    ['active']
]

const old = (arrObj) => arrObj.age > 40;

console.log(elements.findIndex(old))
