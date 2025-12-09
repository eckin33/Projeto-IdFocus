function FormTime ({ onSubmit }){
    const enviar = (e) =>{
        e.preventDefault()

        const dados = {
            ifoco: e.target.focoTime.value,
            irest: e.target.restTime.value
        }

        onSubmit(dados)
    }

    return(
            <><button id='menuBtn' className='btn btn-dark' type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <span className="material-symbols-outlined">
                menu
            </span>
        </button><div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header offcanvaBg">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Personalizar Tempo</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body offcanvaBg">
                    <div>
                        Fique à vontade para personalizar o tempo.
                    </div>
                    <div className="dropdown mt-3">
                        <form id='alterarTime' onSubmit={enviar}>
                            <div>
                                <label htmlFor="focoTime">Tempo de foco:</label>
                                <input type="text" name="focoTime" id="ifoco" />
                            </div>
                            <div>
                                <label htmlFor="restTime">Tempo de descanso:</label>
                                <input type="text" name="restTime" id="irest" />
                            </div>

                            <button type="submit" className='btn btn-primary p-2 mt-4'>alterar</button>
                        </form>

                    </div>
                </div>
            </div></>
    )
}

export default FormTime