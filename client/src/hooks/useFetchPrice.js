import { useEffect, useState } from "react"

const useFetchPrice = (url, burgerName) => {
    const [price, setPrice] = useState(null);
    useEffect(() => {
        var burgerPrice;
        fetch(url)
        .then(response => {
            return response.json();
        })
        .then(data => {
            burgerPrice = data.filter(burger => burger.burger_name === burgerName)[0]["burger_price"];  
            setPrice(burgerPrice);
        })
    })
    return price;
}

export default useFetchPrice;