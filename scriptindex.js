function senhaCorreta() {
    const senha = document.getElementById('ipass').value;
    const user = document.getElementById('iuser').value;

    if (senha === '.') {
        localStorage.setItem("userLogado", user);
        window.location.href = 'app.html';
    } else {
        alert('Senha incorreta.');
    }
}

let enter = document.getElementById('ipass').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') senhaCorreta()

})

function pegarLocUser() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        console.log("Latitude: ", latitude, "Longitude: ", longitude)

        localStorage.setItem("latitude", JSON.stringify(latitude))
        localStorage.setItem("longitude", JSON.stringify(longitude))
    })

}
console.log(navigator.userAgent)
pegarLocUser()

