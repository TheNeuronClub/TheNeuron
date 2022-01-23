import { useState, useEffect } from 'react'

function getCurrency() {
    const [currencyApi, setCurrencyApi] = useState();

    useEffect(() => {
        fetch("https://currency-exchange.p.rapidapi.com/listquotes", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "currency-exchange.p.rapidapi.com",
                "x-rapidapi-key": "5c40381fc0msh7880c0810bb8aa0p134a9ajsne3214a4398a4"
            }
        })
            .then(response => response.json())
            .then(response => {
                setCurrencyApi(response)
            })
            .catch(err => {
                console.error("Cannot get Crypto data");
            });
    }, [])

    return currencyApi
}

export default getCurrency