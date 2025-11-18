const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "Projeto-IdFocus/login.html";
  }

let display = document.getElementById('principalPai')
let recuperarLista = localStorage.getItem('listaDespesas') 
let despesas = JSON.parse(recuperarLista) || []


function renderizarDespesas(){
    
    let tabela = document.getElementById('tabela')
    tabela.innerHTML = ''
    
    despesas.forEach(despesa => {
        console.log(`Dia ${despesa.dia} de ${despesa.mes}. Tipo: ${despesa.tipo}. Descrição: ${despesa.descricao}. R$:${despesa.valor}`)
    
        let linha = document.createElement('tr')

        linha.innerHTML = `<td id="td_data">${despesa.dia} de ${despesa.mes}</td> <td id = "td_tipo">${despesa.tipo}</td> <td id = "td_desc">${despesa.descricao}</td> <td id="td_valor">R$:${despesa.valor}</td>`

        tabela.appendChild(linha)
        localStorage.setItem('listaDespesas', JSON.stringify(despesas))
    });
}
function limparLista(){
    despesas = []
    localStorage.setItem('listaDespesas', JSON.stringify(despesas))
    window.location.reload()
}

