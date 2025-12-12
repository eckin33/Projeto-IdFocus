import { useState, useEffect, useRef } from 'react'
import Display from './display.jsx'
import './App.css'

function App() {


  const [ativo, setAtivo] = useState(false)
  let [minuto, setMinuto] = useState(0)
  let [segundo, setSegundo] = useState(0)
  let [foco, setFoco] = useState(false)
  let [rest, setRest] = useState(false)
  let btnAtivo = useRef()

  const receberDados = (dados) => {
    console.log("Recebido no App:", dados);

    // Converter
    const foco = parseInt(dados.ifoco);
    const descanso = parseInt(dados.irest);

    // Validação simples
    if (isNaN(foco) || isNaN(descanso)) {
      alert("Digite números válidos!");
      return;
    }

    // Atualiza o timer
    setAtivo(false);
    setMinuto(foco);
    setSegundo(0);

    localStorage.setItem('foco', foco)
    localStorage.setItem('rest', descanso)

  };

  //Timer
  useEffect(() => {

    if (ativo) {
      
      const timer = setInterval(() => {

        if (minuto === 0 && segundo === 0) {
          clearInterval(timer)
          setFoco(false)
          setRest(false)
          setAtivo(false)

          return
        }

        if (segundo === 0) {
          setMinuto(minuto - 1)
          setSegundo(59)
        } else {
          setSegundo(segundo - 1)
        }
      }, 1000);

      return () => clearInterval(timer)
    }
  }, [minuto, segundo, ativo,])

  //Funções controle
  const alternarAtivo = () => {
    setAtivo(!ativo) 
    if(minuto == 0 && segundo == 0){
      setAtivo(false)
      inciarFoco()
    }
  }

  const inciarPausa = () => {
    if(localStorage.getItem('rest') !== null){
      let rest = parseInt(localStorage.getItem('rest'))
      setAtivo(false)
      setFoco(false)
      setRest(true)
      setMinuto(rest)
      setSegundo(0)
      
    } else {
      setFoco(false)
      setAtivo(false)
      setRest(true)
      setMinuto(5)
      setSegundo(0)
    }
  }

  const inciarFoco = () => {
    if(localStorage.getItem('foco') !== null){
      let foco = parseInt(localStorage.getItem('foco'))
      setAtivo(false)
      setRest(false)
      setFoco(true)
      setMinuto(foco)
      setSegundo(0)
    }else{
      setAtivo(false)
      setRest(false)
      setFoco(true)
      setMinuto(25)
      setSegundo(0)

    }
  }

  const reiniciar = () => {
    
      setAtivo(false)
      setFoco(false)
      setRest(false)
      setMinuto(25)
      setSegundo(0)
  }

  return (
    <>
      <h2>Pomodoro</h2>

      <div id='mesageDiv'>
        {foco ? "Você está no foco agora" : ""}
        {rest ? "Você está no descanso agora" : ""}
      </div>

      <Display
        minuto={minuto}
        segundo={segundo}
        onSubmit={receberDados}
      />

      <div id='box-botoes'>

        <button onClick={alternarAtivo} id='startBtn' className={ativo ? 'pausar' : 'ativo'}>
          {ativo ? "PAUSAR" : "INICIAR"}
        </button>

        <button onClick={inciarPausa} ref={btnAtivo}>Descanso</button>
        <button onClick={inciarFoco} >Foco</button>
        <button onClick={reiniciar}>Reiniciar</button>

      </div>


    </>
  )
}

export default App
