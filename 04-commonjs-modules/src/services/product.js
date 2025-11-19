// todas as funções que lidam com produto
async function getFullName(codeId, productName) {
    console.log(`Product Code:${codeId}`)
    doBreakLine()
    console.log(`Product Name:${productName}`)
}   

// hidden members
async function doBreakLine() { 
    console.log('\n')
}

module.exports = {
    getFullName
}