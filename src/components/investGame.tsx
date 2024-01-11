import { P, Slider, Button, H2, Space, ProgressIndicator } from "@dnb/eufemia";
import { useState, useEffect } from "react";
import { companyMapping } from "./investGame/companyMapping";
import { useScore } from "../App";

// To make the game more fun the prices for the companies are based on crypto prices,
// Instead of the actual stock prices. This is because the stock prices are too stable.
// This makes the prices fluctuate a lot, and makes the game more interesting

function InvestGame() {
  const [data, setData] = useState([]);
  const { score, setScore } = useScore();
  const [share, setShares] = useState(() => {
    const savedShares = localStorage.getItem("shares");
    return savedShares !== null ? JSON.parse(savedShares) : {};
  });

  const handleBuy = (company: string, price: number) => {
    // Update the number of shares for the given company
    if (score > price) {
      setShares((prevShares: any) => ({
        ...prevShares,
        [company]: (prevShares[company] || 0) + 1,
      }));

      // Subtract the price from the score
      setScore(score - price);
    } else alert("Du har ikke nok penger");
  };

  // if you need to use new properties from the API, you can add them here
  // check out this link to see all properties
  // https://api.coingecko.com/api/v3/coins/markets?vs_currency=nok
  interface Coin {
    current_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    id: string;
    name: string;
    image: string;
  }

  useEffect(() => {
    localStorage.setItem("shares", JSON.stringify(share));

    return () => {
      window.addEventListener("beforeunload", () => {
        localStorage.setItem("shares", JSON.stringify(share));
      });
    };
  }, [share]);

  // Fetches data from the coingecko API
  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=nok")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  }, []);

  // If the data has been fetched, it displays the stocks and buy option
  if (data[2]) {
    console.log(data);
    return (
      <div className="height">
        <H2>Aksjer</H2>
        <Space top="1rem" />
        {(data as Coin[]).slice(0, 4).map((coin: Coin, index: number) => {
          let amount = coin.current_price;
          let formattedAmount = amount.toLocaleString("no-NB") + ",- kr";
          let priceChangeColor = coin.price_change_24h < 0 ? "red" : "green";
          let company = companyMapping[coin.id];
          // let backgroundColor = index % 2 === 0 ? "#D2F0E9" : "white"; // Replace 'color1' and 'color2' with your colors
          return (
            <div
              key={index}
              className="coinCard"
              // style={{ backgroundColor: backgroundColor }}
            >
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
                <Slider labelDirection="vertical" label="👷🔧" />
                <Button
                  text="Kjøp"
                  on_click={() => handleBuy(company.name, coin.current_price)}
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  // If the data has not been fetched, it displays a loading screen
  else {
    return (
      <div>
        <h1>Aksjer</h1>
        <P className="textContainer">Siden lastes inn.</P>
        <ProgressIndicator />
      </div>
    );
  }
}

export default InvestGame;
