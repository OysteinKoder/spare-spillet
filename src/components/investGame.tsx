import { useState } from "react";
import axios from "axios";
import { P } from "@dnb/eufemia";

function InvestGame() {
  // const [stocks, setStocks] = useState([]);

  // const getInvestment = async (tickers: string[]) => {
  //   const requests = tickers.map((ticker) => {
  //     const options = {
  //       method: "GET",
  //       url: "https://yh-finance-complete.p.rapidapi.com/yhprice",
  //       params: { ticker },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "82b491b7ffmsh97a40947405ae9cp13eca2jsn0ff7cbdfe551",
  //         "X-RapidAPI-Host": "yh-finance-complete.p.rapidapi.com",
  //       },
  //     };

  //     return axios.request(options);
  //   });

  //   try {
  //     const responses = await Promise.all(requests);
  //     setStocks(responses.map((response) => response.data) as any[]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // getInvestment(["dnb"]);

  return (
    <div>
      <h1>Aksjer</h1>
      <P className="textContainer">
        Her skal det bli mulig å bruke pengene man tjente i klikke-spillet til å
        kjøpe og selge aksjer.
        <br /> Porteføljen din lagres i nettleseren og dukker opp igjen neste
        gang du åpner denne nettsiden
      </P>
    </div>
  );
}

export default InvestGame;
