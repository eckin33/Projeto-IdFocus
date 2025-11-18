/* function senhaCorreta() {
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
 */

document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
        email: document.getElementById('iuser').value,
        password: document.getElementById('ipass').value
    };

    const response = await fetch("https://backend-idf.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const result = await response.json();
    console.log(result);

    // Verificar se o registro foi bem-sucedido
    if (result.token) {
        let meuToken = result.token
        let userName = result.user.name

        localStorage.setItem("userLogado", userName)
        localStorage.setItem("token", meuToken)

        window.location.href = "app.html"
    } else {
        alert("Login falhou. Tente novamente.");
        return;
    }
});

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

