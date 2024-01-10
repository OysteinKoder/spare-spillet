import { H2, P } from "@dnb/eufemia";
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
          style={{
            padding: "20px",
            margin: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            boxShadow: "0 2px 5px rgba(0, 0, 0, 0.15)",
            backgroundColor: "#fff",
          }}
        >
          <P>
            {company}: {share[company]}
          </P>
        </div>
      ))}
    </div>
  );
}
