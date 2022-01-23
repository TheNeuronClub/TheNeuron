import { useState, useEffect } from 'react'

function getCrypto() {
    const [cryptoApi, setCryptoApi] = useState();

    useEffect(() => {
        fetch("https://coinranking1.p.rapidapi.com/coins", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                "x-rapidapi-key": "5c40381fc0msh7880c0810bb8aa0p134a9ajsne3214a4398a4"
            }
        }).then(response => response.json())
            .then(response => {
                setCryptoApi(response?.data?.coins)
            })
            .catch(err => {
                console.error("Cannot get Crypto data");
            });
    }, [])

    return cryptoApi
}

export default getCrypto