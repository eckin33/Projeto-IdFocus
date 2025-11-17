const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "/login.html";
}


let lista = JSON.parse(localStorage.getItem("lista")) || []
const tarefas = JSON.parse

function salvarListaNoLocalStorage() {
    localStorage.setItem("lista", JSON.stringify(lista))
}

let alvo = ''

function renderizarLista() {
    const listaUl = document.getElementById("listaPrincipal")
    listaUl.innerHTML = ""

    lista.forEach((item, index) => {
        const li = document.createElement("li")
        li.style.textIndent = '50px'

        // Checkbox
        const checkbox = document.createElement("input")
        checkbox.classList.add('check')
        checkbox.type = "checkbox"
        checkbox.checked = item.marcado
        checkbox.style.position = 'absolute'
        checkbox.style.left = '4px'
        checkbox.style.top = '19%'
        checkbox.style.width = '23px'
        checkbox.style.height = '23px'

        checkbox.onclick = () => {
            lista[index].marcado = checkbox.checked
            salvarListaNoLocalStorage()
            renderizarLista()

        }
        if (checkbox.checked === true) {
            li.style.textDecoration = 'line-through'
            salvarListaNoLocalStorage()
        } else {
            li.style.textDecoration = 'none'
        }

        // Texto
        const span = document.createElement("span")
        span.textContent = item.texto

        // Botão de delete
        const btnDelete = document.createElement("button")
        btnDelete.textContent = "delete"
        btnDelete.classList.add('material-symbols-outlined')
        btnDelete.onclick = () => {
            lista.splice(index, 1)
            salvarListaNoLocalStorage()
            renderizarLista()
        }

        li.appendChild(checkbox)
        li.appendChild(span)
        li.appendChild(btnDelete)
        listaUl.appendChild(li)

        //evento(mouse botao direito)
        li.oncontextmenu = (e) => {
            alvo = e.target

            console.log('elemento: ', alvo)
            //Previne o menu do navegador (inspecionar e tal)
            e.preventDefault()

            //Coordenadas do click
            let cordX = e.pageX
            let cordY = e.pageY

            //Vai como parâmetro da função... Que lindo
            clickDireito(cordX, cordY)
        }
    })
}

function adicionarItem() {
    const input = document.getElementById("addInput")
    const texto = input.value.trim()
    if (texto === "") {
        alert("Digite uma tarefa!")
        return
    }

    lista.push({ texto: texto, marcado: false })
    salvarListaNoLocalStorage()
    renderizarLista()
    input.value = ""
}

document.getElementById("addInput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") adicionarItem()
})

let valorTarefa = ''
function clickDireito(x, y) {

    //se não tiver uma div com classe menu, vai fazer... 2 ao mesmo tempo nao dá.
    if (!document.body.querySelector("div.menu")) {
        const menu = document.createElement("div")

        menu.classList.add("menu")
        menu.innerText = 'editar'
        menu.style.top = `${y}px`
        menu.style.left = `${x}px`

        document.body.appendChild(menu)

        document.body.addEventListener("click", function (event) {

            //Se o lugar onde eu clickei nao foi o menu, fecha o menu.
            if (event.target !== menu) {
                menu.remove()
            }
            //Se foi no menu, vau criar um input pra editar a tarefa.
            if (event.target == menu) {

                //"alvo" foi declarado la em cima, é o alvo do click direito.
                //O alvo mesmo foi o "li", ai a gente pega o filho dele, o "span".
                let filhoAlvo = alvo.querySelector("span")

                //Depois criamos o input, adicionamos a classe que na no css
                let inputEditar = document.createElement("input")
                inputEditar.attributes = 'text'
                inputEditar.classList.add("inputEditar")

                //Efeito blur atrás do input
                let paiInput = document.createElement("div")
                paiInput.classList.add("modal-overlay")
                paiInput.classList.add("active")

                paiInput.appendChild(inputEditar)
                document.body.appendChild(paiInput)

                //fechar o menu editar
                menu.remove()

                //icone de fechamento
                let fecharInput = document.createElement("img")
                fecharInput.src = "./imagens/close.png"
                fecharInput.classList.add("fecharInput")
                document.body.appendChild(fecharInput)

                //Função de fechamento
                fecharInput.onclick = () => {
                    inputEditar.remove()
                    fecharInput.remove()
                    paiInput.classList.remove("active")
                }

                //Evento de Keydown, aqui o valor do "span" vai mudar de fato.
                inputEditar.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") {

                        //Armazena a tarefa antiga e a nova
                        const textoAntigo = filhoAlvo.innerText.trim()
                        const novoTexto = inputEditar.value.trim()

                        if (novoTexto === "") return

                        //atualiza visualmente
                        filhoAlvo.innerText = novoTexto

                        //Atualiza no localStorage
                        const index = lista.findIndex(item => item.texto === textoAntigo)

                        if (index !== 1) {
                            lista[index].texto = novoTexto
                            salvarListaNoLocalStorage()
                        }

                        removerGuys()
                    }
                })
                function removerGuys() {
                    paiInput.classList.remove("active")
                    fecharInput.remove()
                    inputEditar.remove()

                }
            }
        })
    }
}

renderizarLista()