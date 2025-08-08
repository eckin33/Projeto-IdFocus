const nome = localStorage.getItem("userLogado");
const cidadeUserRecuperada = JSON.parse(localStorage.getItem("cidadeUser")) //Metodo Tradicional
const cidadeSalva = JSON.parse(localStorage.getItem("cidade_brave")) //Metodo Brave
const Latitude = JSON.parse(localStorage.getItem("latitude")) || []
const longitude = JSON.parse(localStorage.getItem("longitude")) || [] // Latitude e Longitude que veio do index.html


async function obterCidadeUsuario() {
    console.log(typeof (Latitude))
    const apiKey = '8c23ddee47c2f7b5b6beee49428d169a'
    const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${Latitude}&lon=${longitude}&appid=${apiKey}`
    const urlCidade = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeUserRecuperada}&appid=${apiKey}&units=metric&lang=pt_br`


    const resposta = await fetch(url);
    const dados = await resposta.json();

    const nomeCidade = dados[0].name
    let nomeCidadeUser = nomeCidade

    localStorage.setItem('cidadeUser', JSON.stringify(nomeCidadeUser))

    const respostaBuscaCidade = await fetch(urlCidade);
    const dadosBuscaCidade = await respostaBuscaCidade.json();

    console.log(dadosBuscaCidade)

    if (dadosBuscaCidade.cod === 200) {
        mostrarInfos({
            icone: dadosBuscaCidade.weather[0].icon,
            city: dadosBuscaCidade.name,
            description: dadosBuscaCidade.weather[0].description,
            temp: dadosBuscaCidade.main.temp
        });
    } else {
        alert('erro ao exibir API. #Metotodo Tradicional')
    }


    function mostrarInfos(dadosBuscaCidade) {
        document.getElementById('desenhoClima').setAttribute('src', `https://openweathermap.org/img/wn/${dadosBuscaCidade.icone}@2x.png`);
        document.getElementById('spanNomeCidade').innerHTML = `${dadosBuscaCidade.city}`;
        document.getElementById('spanTempo').innerHTML = `${dadosBuscaCidade.description}`;
        document.getElementById('spanTemperatura').innerHTML = `${dadosBuscaCidade.temp.toFixed(1).toString().replace('.', ',')}<sup>°</sup>`;
        console.log(typeof (dadosBuscaCidade.temp), dadosBuscaCidade.temp)

        let frasesTemperatura20mais27menos =
            Array(
                'Tá tão de boa hoje que nem o capeta, nem o pinguim se manifestaram hoje.',
                'Clima ta bão hoje, sai do PC meu fi',
                'Clima ta bangu'
            )

        let frasesTemperatura20menos =
            Array(
                'Se for sair leva blusa de fri, pq ta fri viu 😉',
                'vai por uma meia nesse pé, ta frio 😉',
                'Um dia frio, um bom lugar pra ler um livro...'

            )
        let frasesTemperatura28mais =
            Array(
                'Nesse calor como sua bunda, né? (Estou me referindo ao suor, ok?)',
                'Ta tão quente que se correr, derrete, se parar, assa.',
                'Ja da pra fritar um ovo no asfalto.'

            )

        let escolherFraseClima28mais = Math.floor(Math.random() * frasesTemperatura28mais.length)
        let escolherFraseClima27menos = Math.floor(Math.random() * frasesTemperatura20mais27menos.length)
        let escolherFraseClima20menos = Math.floor(Math.random() * frasesTemperatura20menos.length)
        if (dadosBuscaCidade.temp <= 28 /*Da pra colocar logica de Horario aqui*/) {
            document.getElementById('spanLegenda').textContent = frasesTemperatura20mais27menos[escolherFraseClima27menos]
        }
        if (dadosBuscaCidade.temp <= 20) {
            document.getElementById('spanLegenda').textContent = frasesTemperatura20menos[escolherFraseClima20menos]
        }
        if (dadosBuscaCidade.temp >= 28) {
            document.getElementById('spanLegenda').textContent = frasesTemperatura28mais[escolherFraseClima28mais]
        }
    }
}

obterCidadeUsuario()


let frasesRecepcao =
    Array('Bem vindo ' + nome,
        'Bem vindo de volta ' + nome,
        'Eai ' + nome + ', como vai parceiro?',
        'Falaê meu mano ' + nome,
        'Saudações meu parceiro ' + nome,
        'Bom te ver meu mano ' + nome
    )

let escolher = Math.floor(Math.random() * frasesRecepcao.length)

if (nome) {
    document.getElementById('pSection').textContent = frasesRecepcao[escolher]
}

function listaIr() {
    window.location.href = 'lista.html'

}
function registroIr() {
    window.location.href = 'registro.html'
}

//console.log(frasesRecepcao,escolher)
console.log(frasesRecepcao[escolher])



setTimeout(() => {

    let teste = document.getElementById("spanNomeCidade");

    if (teste.textContent.trim() === '') {
        //LOGICA PRA COLETAR A CIDADE NO NAVEGADOR BRAVE!

        async function obterCidadeUsuarioMetodoBrave() {

            let cidade = cidadeSalva
            if (!cidade) {
                cidade = prompt('Por favor, digite a sua cidade: ')
                localStorage.setItem("cidade_brave", JSON.stringify(cidade))
            }

            const apiKey_brave = '8c23ddee47c2f7b5b6beee49428d169a'
            const urlCidade_brave = `https://api.openweathermap.org/data/2.5/weather?q=${cidadeSalva || cidade}&appid=${apiKey_brave}&units=metric&lang=pt_br`

            const respostaBuscaCidade_brave = await fetch(urlCidade_brave);
            const dadosBuscaCidade_brave = await respostaBuscaCidade_brave.json();

            console.log(dadosBuscaCidade_brave)
            if (dadosBuscaCidade_brave.cod === 200) {
                mostrarInfos({
                    icone: dadosBuscaCidade_brave.weather[0].icon,
                    city: dadosBuscaCidade_brave.name,
                    description: dadosBuscaCidade_brave.weather[0].description,
                    temp: dadosBuscaCidade_brave.main.temp
                });
            } else {
                alert('erro ao exibir API #Metodo Brave')
            }


            function mostrarInfos(dadosBuscaCidade_brave) {
                document.getElementById('desenhoClima').setAttribute('src', `https://openweathermap.org/img/wn/${dadosBuscaCidade_brave.icone}@2x.png`);
                document.getElementById('spanNomeCidade').innerHTML = `${dadosBuscaCidade_brave.city}`;
                document.getElementById('spanTempo').innerHTML = `${dadosBuscaCidade_brave.description}`;
                document.getElementById('spanTemperatura').innerHTML = `${dadosBuscaCidade_brave.temp.toFixed(1).toString().replace('.', ',')}<sup>°</sup>`;
                console.log(typeof (dadosBuscaCidade_brave.temp), dadosBuscaCidade_brave.temp)

                let frasesTemperatura20mais27menos =
                    Array(
                        'Tá tão de boa hoje que nem o capeta, nem o pinguim se manifestaram hoje.',
                        'Clima ta bão hoje, sai do PC meu fi',
                        'Clima ta bangu'
                    )

                let frasesTemperatura20menos =
                    Array(
                        'Se for sair leva blusa de frio 😉',
                        'vai por uma meia nesse pé, ta frio 😉',
                        'Um dia frio, um bom lugar pra ler um livro...'

                    )
                let frasesTemperatura28mais =
                    Array(
                        'Nesse calor como sua bunda, né? (Estou me referindo ao suor, ok?)',
                        'Ta tão quente que se correr, derrete, se parar, assa.',
                        'Ja da pra fritar um ovo no asfalto.'

                    )

                let escolherFraseClima28mais = Math.floor(Math.random() * frasesTemperatura28mais.length)
                let escolherFraseClima27menos = Math.floor(Math.random() * frasesTemperatura20mais27menos.length)
                let escolherFraseClima20menos = Math.floor(Math.random() * frasesTemperatura20menos.length)
                if (dadosBuscaCidade_brave.temp <= 28 ) {
                    document.getElementById('spanLegenda').textContent = frasesTemperatura20mais27menos[escolherFraseClima27menos]
                }
                if (dadosBuscaCidade_brave.temp <= 20) {
                    document.getElementById('spanLegenda').textContent = frasesTemperatura20menos[escolherFraseClima20menos]
                }
                if (dadosBuscaCidade_brave.temp >= 28) {
                    document.getElementById('spanLegenda').textContent = frasesTemperatura28mais[escolherFraseClima28mais]
                }
            }

        }
        obterCidadeUsuarioMetodoBrave()


    } else {
        console.log('ta ocupado depois dos segundos') //Deu certo, Ja ta na tela os dados
    }

}, 3000)
