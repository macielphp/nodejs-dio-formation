const descricao = "Atualizacao de Software Aplicar patches 22/12";
if (descricao.length > 50) {
  print("O Valor da descrica excede a quantidade de caracteres permitido")
} else {
    const arr = descricao.split(' ');

    arr.forEach(caractere => {
        if(caractere.slice(-1) === 'r'){
            const novaString = arr.slice(arr.indexOf(caractere)).join(' ');
            console.log(novaString)
        }
    })

}
