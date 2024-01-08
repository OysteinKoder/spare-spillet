import { Button, H1, H2, P, Space } from "@dnb/eufemia";
import { useState } from "react";

function App() {
  const [score, setScore] = useState(0);
  const [scoreAmount, setScoreAmount] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(10);

  const upgradeCostText = "kjøp for " + upgradeCost + ",- kr";
  return (
    <>
      <div
        className="container"
        onClick={() => {
          setScore((score) => score + scoreAmount);
        }}
      >
        <H1>Spare-Spillet</H1>
        <P size="large">kr: {score} ,- </P>
        <P>Klikk for å tjene penger!</P>
        <Space top="x-large" />
        <H2>Oppgradderinger</H2>
        <p>Få en til krone for hvert klikk!</p>
        <Button
          text={upgradeCostText}
          onClick={() => {
            if (score >= upgradeCost) {
              setScore((score) => score - upgradeCost);
              setScoreAmount((scoreAmount) => scoreAmount + 1);
              setUpgradeCost((upgradeCost) => upgradeCost * 2);
            }
          }}
        />
      </div>
    </>
  );
}

export default App;
