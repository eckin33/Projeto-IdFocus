 function senhaCorreta() {
    const senha = document.getElementById('ipass').value;
    const user = document.getElementById('iuser').value;

    if (senha === '1needL34rnJson.') {
        localStorage.setItem("userLogado", user); 
        window.location.href = 'app.html';
    } else {
        alert('Senha incorreta.');
    }
}

let enter = document.getElementById('ipass').addEventListener('keydown', (e) =>{
    if(e.key === 'Enter') senhaCorreta()
    
})

