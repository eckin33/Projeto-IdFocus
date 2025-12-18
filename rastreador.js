export async function rastrearEvento(tipo, metadada = {}) {
    const token = localStorage.getItem("token")

    if(!token) return

    function decodeToken(token){
        const payload = token.split('.')[1]
        const decodedPayLoad = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
        return JSON.parse(decodedPayLoad)
    }
    let objToken = decodeToken(token)

    const request = await fetch("https://backend-idf.vercel.app/events", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            tipo,
            email : objToken.email,
            metadada
        })
    })

    console.log("Evento enviado: ",tipo, metadada )

    const response = await request.json()
    if (response) {
        console.log(response)
    }else{
        console.log('nao')
    }

}