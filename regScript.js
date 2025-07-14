let _mes = document.getElementById('imes')
let _dias = document.getElementById('idia')
let _31 = document.getElementById('o31')
let _30 = document.getElementById('o30')
let _29 = document.getElementById('o29')
let tipo = document.getElementById('itipo')
let desc = document.getElementById('idesc')
let valor = document.getElementById('ivalor')
let id = 0

/*
Fevereiro tem 28 dias, outros meses tem 31 ou 30. 
Essa foi a solução que eu encontrei pra resolver mas provavelmente tem jeito mais facil.  
*/

_mes.addEventListener('change', () => {
    const valorSelecionado = _mes.value
    console.log('Selecionou: ' + valorSelecionado)

    if(valorSelecionado == 'Fevereiro'){
        _29.style.display = 'none'
        _30.style.display = 'none'
        _31.style.display = 'none'
    }
    else{
        _29.style.display = 'block'
        _30.style.display = 'block'
        _31.style.display = 'block'
    }
    if(valorSelecionado == 'Abril'||valorSelecionado == 'Junho'|| valorSelecionado == 'Setembro'||valorSelecionado == 'Novembro'){
        _31.style.display = 'none'
    }
})

/* registros é a lista onde vao ser armazenadas as despesas. ela recupera as despesas que ja foram salvas em consulta.html
se nao tiver nada salvo ela so vira uma lista (array) vazia. Desse jeito nao perde nenhuma despesa a não ser que elas
sejam apagadas por querer.
*/
const registros = JSON.parse(localStorage.getItem('listaDespesas')) || []

document.getElementById('btnAdd').addEventListener('click', () => {
    const despesa = {}; //objeto vazio
    id++

    despesa.mes = _mes.value
    despesa.dia = _dias.value
    despesa.tipo = tipo.value
    despesa.descricao = desc.value
    despesa.id = id 
    despesa.valor = valor.value

    //Adicionamos atributos para esse objeto (despesa)

    registros.push(despesa) //Coloca a despesa na lista
    localStorage.setItem('listaDespesas', JSON.stringify(registros)) //Salva a lista. Agora consulta.html pode recuperar no LocalStorage.

    desc.value = ''
    valor.value = ''

})

function consulta(){
    window.location.href = 'consulta.html'
}

