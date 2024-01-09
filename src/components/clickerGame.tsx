import { Button, H2, P, Space } from "@dnb/eufemia";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { FaDollarSign } from "react-icons/fa";
import { useScore } from "../App";

// Triggers a dollar that falls from the top of the screen
// Is used whenever the user clicks the screen to earn money

const FallingDollar = () => {
  const props = useSpring({
    from: { top: -100, left: Math.random() * window.innerWidth },
    to: { top: window.innerHeight },
    config: { duration: 2000 },
  });
  return (
    <animated.div style={{ ...props, position: "absolute", left: "50%" }}>
      <FaDollarSign />
    </animated.div>
  );
};

// Contains the whole clicker game

function ClickerGame() {
  const { score, setScore } = useScore();
  const [scoreAmount, setScoreAmount] = useState(1);
  const [upgradeCost, setUpgradeCost] = useState(10);
  const [showDollar, setShowDollar] = useState(false);

  const upgradeCostText = "kjøp for " + upgradeCost + ",- kr";

  // triggers the dollar animation
  const triggerAnimation = () => {
    setShowDollar(true);
    setTimeout(() => setShowDollar(false), 2000);
  };

  return (
    <>
      <div
        className="center"
        onClick={() => {
          setScore((score) => score + scoreAmount);
          triggerAnimation();
        }}
      >
        <P>Klikk for å tjene penger!</P>
        <Space top="10rem" />
        <H2>Oppgradderinger</H2>
        <p>Få en til krone for hvert klikk!</p>
      </div>
      <div className="center">
        <Button
          text={upgradeCostText}
          onClick={() => {
            if (score >= upgradeCost) {
              setScore((score) => score - upgradeCost);
              setScoreAmount((scoreAmount) => scoreAmount + 1);
              setUpgradeCost((upgradeCost) => Math.floor(upgradeCost * 1.5));
            }
          }}
        />
        <p>Dobble inntjening per klikk!</p>
        <Button
          text={upgradeCostText}
          onClick={() => {
            if (score >= upgradeCost) {
              setScore((score) => score - upgradeCost);
              setScoreAmount((scoreAmount) => scoreAmount * 2);
              setUpgradeCost((upgradeCost) => Math.floor(upgradeCost * 3));
            }
          }}
        />
        {showDollar && <FallingDollar />}
      </div>
    </>
  );
}

export default ClickerGame;
