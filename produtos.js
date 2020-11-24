class Produto {
    constructor(){
        this.produtos = localStorage.getItem('tbProdutos') === null
                        ? []
                        : JSON.parse(localStorage.getItem('tbProdutos'))
    }
    salva(produto){
        if(document.getElementById('codigo').getAttribute('disabled')==='disabled'){
            this.apaga(produto.codigo)
        }
        this.produtos.push(produto) //adiciona um novo elemento ao array
        alert('Produto salvo com sucesso!')
        localStorage.setItem('tbProdutos', JSON.stringify(this.produtos))
    }

    edita(produto){
        document.getElementById('codigo').value = produto.codigo
        document.getElementById('codigo').setAttribute('disabled','disabled')
        document.getElementById('nome').value = produto.nome
        document.getElementById('custo').value = produto.custo
        document.getElementById('lucro').value = produto.lucro
        document.getElementById('venda').value = produto.venda
        document.getElementById('icms').value = produto.icms
        document.getElementById('nfe').value = produto.nfe
        document.getElementById('medida').value = produto.medida
        document.getElementById('marca').value = produto.marca
        document.getElementById('categoria').value = produto.categoria
        document.getElementById('origem').value = produto.origem
        document.getElementById('barras').value = produto.barras 
    }

    apaga(codigo){
        let index = this.produtos.findIndex(produto => produto.codigo == codigo)
        this.produtos.splice(index, 1) //splice remove o item do índice no array
        localStorage.setItem('tbProdutos',JSON.stringify(this.produtos))
        produto.atualiza()
    }

    lista(){
        const listagem = this.produtos.map((produto) => (
            `<tr>
                <td>${produto.codigo}</td>    
                <td>${produto.nome}</td>
                <td>${produto.custo}</td>
                <td>${produto.lucro}</td>
                <td>${produto.venda}</td>
                <td>${produto.icms}</td>
                <td>${produto.nfe}</td>
                <td>${produto.medida}</td>
                <td>${produto.marca}</td>
                <td>${produto.categoria}</td>
                <td>${produto.origem}</td>
                <td>${produto.barras}</td>
                <td>
                    <button id='apagar' onClick='produto.apaga(${produto.codigo})'>
                    🗑️ Apagar </button>
                    <button id='editar' onClick='produto.edita(${JSON.stringify(produto)})'>
                    🗒️ Editar </button> 
                </td>
             </tr>
            `
        ))
        return(`<table border='1' class='paleBlueRows'>
        <caption>Relação de Produtos</caption>
        <thead>
            <th>Código</th>      
            <th>Nome</th>
            <th>Preço Custo</th>         
            <th>Lucro %</th>
            <th>Preço de Venda</th>      
            <th>ICMS %</th>
            <th>NF-e</th> 
            <th>Unidade Medida</th> 
            <th>Marca</th>
            <th>Categoria</th>
            <th>Origem</th>
            <th>Código de Barras</th>
            <th class="opcoes">Opções</th>
        </thead>
        <tbody>${listagem}</tbody>
        </table>    
        `)
    }
    atualiza(){
        document.getElementById('listagem').innerHTML = produto.lista()
    }
}
//instanciamos um novo objeto
const produto = new Produto()
//tratamos o botão salvar
document.getElementById('salvar').onclick = function(){
    const registro = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        custo: document.getElementById('custo').value,
        lucro: document.getElementById('lucro').value,
        venda: document.getElementById('venda').value,
        icms: document.getElementById('icms').value,
        nfe: document.getElementById('nfe').value,
        medida: document.getElementById('medida').value,
        marca: document.getElementById('marca').value,
        categoria: document.getElementById('categoria').value,
        origem: document.getElementById('origem').value,
        barras: document.getElementById('barras').value
       
    }
    produto.salva(registro)
}
//tratamos a listagem
window.onload = function() {
    produto.atualiza()
}

//tratamos a alteração do campo utilizado
document.getElementById('lucro').onchange = function (){
    let custo = document.getElementById('custo').value
    let lucro = document.getElementById('lucro').value

    if(parseFloat(lucro) <= 0){
        alert(`Insira quantos % de lucro!`)
        document.getElementById('lucro').value = 0
    }else{
        venda = parseFloat(custo) + ( parseFloat(custo) * parseFloat(lucro) / 100 )
    }
    
    document.getElementById('venda').value = venda.toFixed(2)
}