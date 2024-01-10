import { P, Slider, Button, H2, Space } from "@dnb/eufemia";
import { useState, useEffect } from "react";

function InvestGame() {
  const [data, setData] = useState([]);
  const [sliderValue, setSliderValue] = useState(0);

  const handleBuy = () => {
    console.log("buying");
  };

  interface Company {
    name: string;
    logo: string;
  }

  interface CompanyMapping {
    [key: string]: Company;
  }

  const companyMapping: CompanyMapping = {
    bitcoin: {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    ethereum: {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Apple-logo.png",
    },
    cardano: {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/34/Tesla_logo.svg",
    },
    tether: {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    binancecoin: {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    // Add more mappings here
  };
  interface Coin {
    current_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    id: string;
    name: string;
    image: string;
    // include any other properties that a coin object might have
  }

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=nok")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  if (data) {
    console.log(data);
    return (
      <div className="height">
        <H2>Aksjer</H2>
        <Space top="1rem" />
        <P>
          {" "}
          <em>Selve kjøp selg funksjonen kommer snart! </em>
        </P>
        {(data as Coin[]).slice(0, 4).map((coin: Coin, index: number) => {
          let amount = coin.current_price;
          let formattedAmount = amount.toLocaleString("no-NB") + ",- kr";
          let priceChangeColor = coin.price_change_24h < 0 ? "red" : "green";
          let company = companyMapping[coin.id];
          return (
            <div key={index} className="coinCard">
              <h3>{company ? company.name : coin.name}</h3>
              <img
                src={company ? company.logo : coin.image}
                alt={coin.name}
                className="coinImg"
              />
              <Space top="1rem" />
              <P>Current Price: {formattedAmount}</P>
              <P style={{ color: priceChangeColor }}>
                24h: {coin.price_change_percentage_24h.toFixed(2)} %
              </P>
              <Space top="1rem" />
              <div className="row">
                <Slider />
                <Button text="Buy" on_click={handleBuy} />
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Aksjer</h1>
        <P className="textContainer">
          Her skal det bli mulig å bruke pengene man tjente i klikke-spillet til
          å kjøpe og selge aksjer.
          <br /> Porteføljen din lagres i nettleseren og dukker opp igjen neste
          gang du åpner denne nettsiden
        </P>
      </div>
    );
  }
}

export default InvestGame;
