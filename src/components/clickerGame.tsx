import { Button, H2, P } from "@dnb/eufemia";
import { useState } from "react";
import { useSpring, animated } from "react-spring";
import { FaDollarSign } from "react-icons/fa";
import { useScore } from "../App";
import { useEffect } from "react";

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
  const [showDollar, setShowDollar] = useState(false);
  const [upgradeCost, setUpgradeCost] = useState(() => {
    const savedUpgradeCost = localStorage.getItem("upgradeCost");
    return savedUpgradeCost !== null ? Number(savedUpgradeCost) : 10;
  });

  // text variables
  const upgradeCostText = "kjøp for " + upgradeCost + ",- kr";

  // triggers the dollar animation
  const triggerAnimation = () => {
    setShowDollar(true);
    setTimeout(() => setShowDollar(false), 2000);
  };

  // Stores the upgradeCost in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("upgradeCost", String(upgradeCost));
  }, [upgradeCost]);

  // Stores the upgradeCost in localStorage when the user leaves the page
  useEffect(() => {
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("upgradeCost", String(upgradeCost));
    });

    // Cleanup the event listener
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.setItem("upgradeCost", String(upgradeCost));
      });
    };
  }, [upgradeCost]);

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

        <p className="bigIcon">💰</p>

        <H2>Oppgraderinger</H2>
        <p>Få en til krone for hvert klikk!</p>
      </div>
      <div className="center">
        <Button
          text={upgradeCostText}
          onClick={() => {
            if (score >= upgradeCost) {
              setScore((score) => score - upgradeCost);
              setScoreAmount((scoreAmount) => scoreAmount + 1);
              setUpgradeCost((upgradeCost) => Math.floor(upgradeCost * 1.2));
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
