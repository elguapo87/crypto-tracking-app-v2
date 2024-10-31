import { useContext, useEffect, useState } from "react";
import "./home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {

  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoins(allCoins);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();

    const coins = await allCoins.filter((item) => item.name.toLowerCase().includes(input.toLocaleLowerCase()));
    setDisplayCoins(coins);
  };

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);;

  return (
    <div className="home">
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. explore state of the cryptocurrency market.</p>

        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list="coinList" value={input} type="text" placeholder="Search crypto..." required />

          <datalist id="coinList">
            {allCoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>

          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>

        {displayCoins.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} key={index} className="table-layout">
            <p>{item.market_cap_rank}</p>

            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>

            <p>{currency.symbol} {item.current_price.toFixed(2)}</p>

            <p className={item.market_cap_change_percentage_24h > 0 ? "green" : "red"}>
              {Math.floor(item.market_cap_change_percentage_24h * 100) / 100} %
            </p>

            <p className="market-cap">{currency.symbol} {item.market_cap.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home
