import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import "./coin.css";
import { useParams } from "react-router-dom";
import LineChart from "../../components/lineChart/LineChart";

const Coin = () => {

  const { currency, usdToRsdRate } = useContext(CoinContext);
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historyData, setHistoryData] = useState();

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-A2GW4kPqYLZqifcQV8zxwPiL' }
    };

    const apiCurrency = currency.name === "rsd" ? "usd" : currency.name;

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false`, options);
      const data = await res.json();

      if (currency.name === "rsd") {
        data.market_data.current_price.rsd = (data.market_data.current_price.usd * usdToRsdRate).toFixed(2);
        data.market_data.market_cap.rsd = (data.market_data.market_cap.usd * usdToRsdRate).toFixed(2);
        data.market_data.high_24h.rsd = (data.market_data.high_24h.usd * usdToRsdRate).toFixed(2);
        data.market_data.low_24h.rsd = (data.market_data.low_24h.usd * usdToRsdRate).toFixed(2);
      }

      setCoinData(data);

    } catch (err) {
      console.error(err);
    }
  };

  const fetchHistoryData = async () => {
    const options = {
      method: 'GET',
      headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-A2GW4kPqYLZqifcQV8zxwPiL' }
    };

    const apiCurrency = currency.name === "rsd" ? "usd" : currency.name;

    try {
      const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${apiCurrency}&days=10&interval=daily`, options)
      let data = await res.json();

      if (currency.name === "rsd") {
        data.prices = data.prices.map(pricePoint => [
          pricePoint[0],
          (pricePoint[1] * usdToRsdRate).toFixed(2)
        ]);
      }

      setHistoryData(data);

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoryData();
  }, [currency]);

  return coinData && historyData ? (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>

      <div className="coin-chart">
        <LineChart historyData={historyData} />
      </div>

      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name]}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name]}</li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name]}</li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name]}</li>
        </ul>
      </div>
    </div>

  ) : <div className="spinner">
    <div className="spin"></div>
  </div>
}

export default Coin
