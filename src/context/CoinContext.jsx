import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {

    const [allCoins, setAllCoins] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const usdToRsdRate = 107.75; 

    const fetchAllCoins = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-A2GW4kPqYLZqifcQV8zxwPiL' }
        };

       
        try {
            const apiCurrency = currency.name === "rsd" ? "usd" : currency.name;
            let res = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${apiCurrency}`, options);
            let data = await res.json();

            if (currency.name === "rsd") {
                data = data.map(coin => ({
                    ...coin,
                    current_price: (coin.current_price * usdToRsdRate),
                    market_cap: (coin.market_cap * usdToRsdRate)
                }));
            }

            setAllCoins(data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchAllCoins();
    }, [currency]);

    const value = {
        allCoins,
        currency, setCurrency,
        usdToRsdRate
    };

    return (
        <CoinContext.Provider value={value}>
            {props.children}
        </CoinContext.Provider>
    )
};

export default CoinContextProvider;