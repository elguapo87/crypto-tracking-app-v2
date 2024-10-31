import "./navbar.css";
import logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { useContext } from "react";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {

  const { setCurrency, currency } = useContext(CoinContext);

  const currencyHender = async (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;

      case "rsd":
        setCurrency({ name: "rsd", symbol: "din" });
        break;
    
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className="navbar">
      <Link to="/"><img className="logo" src={logo} alt="" /></Link>
      {/* <ul>
        <Link to="/"><li>Home</li></Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul> */}

      <div className="nav-right">
        <select onChange={currencyHender}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="rsd">RSD</option>
        </select>

        {/* <button>Sign up <img src={arrow_icon} alt="" /></button> */}
      </div>
    </div>
  )
}

export default Navbar
