let lista = JSON.parse(localStorage.getItem("lista")) || []

        function salvarListaNoLocalStorage() {
            localStorage.setItem("lista", JSON.stringify(lista))
        }

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
                if(checkbox.checked === true){
                    li.style.textDecoration = 'line-through'
                    salvarListaNoLocalStorage()
                }else{
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

        // Carrega ao abrir
        renderizarLista()