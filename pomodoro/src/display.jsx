import './App.css'
import FormTime from './form'

const Display = ({ minuto, segundo, onSubmit }) => {

    let minutoF = String(minuto).padStart(2, '0')
    let segundoF = String(segundo).padStart(2, '0')

    return (
        <div className="App">
            

            <FormTime 
                onSubmit={onSubmit}
            />


            <div id="display">
                <div id="timer">
                    {`${minutoF}:${segundoF}`}
                </div>
            </div>

        </div>
    )

}


 
export default Display;
