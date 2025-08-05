const nome = localStorage.getItem("userLogado");
console.log(nome)

let frasesRecepcao = 
Array(      'Bem vindo ' + nome,
            'Bem vindo de volta '+ nome,
            'Eai '+ nome +', como vai parceiro?',
            'Falaê meu mano ' + nome,
            'Saudações meu parceiro ' + nome,
            'Bom te ver meu mano ' + nome  
     )

let escolher = Math.floor(Math.random() * frasesRecepcao.length) 

    if(nome){
        document.getElementById('pSection').textContent = frasesRecepcao[escolher]
    }

    function listaIr(){
        window.location.href = 'lista.html'

    }
    function registroIr(){
        window.location.href = 'registro.html'
    }

    console.log(frasesRecepcao,escolher)
    console.log(frasesRecepcao[escolher])