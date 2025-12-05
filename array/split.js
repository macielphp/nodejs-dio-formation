const descricao = "Atualizacao de Software Aplicar patches 22/12";

descricao.split(' ').forEach(caractere => {
    console.log(caractere);
    // does it include a number?
    if (/\d/.test(caractere)) {
        const novaString = descricao.split(' ').slice(descricao.split(' ').indexOf(caractere)).join(' ');
        console.log("Um número incluso: " + novaString)
    }
})