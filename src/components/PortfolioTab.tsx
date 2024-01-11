import { Button, H2, P, Slider, Space } from "@dnb/eufemia";
import { useState } from "react";

export default function PortfolioTab() {
  const [share, setShares] = useState(() => {
    const savedShares = localStorage.getItem("shares");
    return savedShares !== null ? JSON.parse(savedShares) : {};
  });

  console.log(share);
  return (
    <div>
      <H2>portefølje</H2>
      {Object.keys(share).map((company: string, idx: number) => (
        <div
          key={idx}
          className="coinCard"
          // style={{ backgroundColor: backgroundColor }}
        >
          <P>
            {company} Shares: {share[company]}
          </P>
          <Space top="1rem" />
          <Space top="1rem" />
          <div className="row">
            <Slider />
            <Button text="Selg" on_click={() => console.log("sold")} />
          </div>
        </div>
      ))}
    </div>
  );
}
