import { createContext, useState, useContext } from "react";
import { H1, Tabs, P, Space } from "@dnb/eufemia";
import ClickerGame from "./components/clickerGame";
import InvestGame from "./components/investGame";
import { useEffect } from "react";

const ScoreContext = createContext(0);

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
}

function App() {
  // const [score, setScore] = useState(0);
  const [score, setScore] = useState(() => {
    // Retrieve the score from localStorage when the component mounts
    const savedScore = localStorage.getItem("score");
    return savedScore !== null ? Number(savedScore) : 0;
  });

  useEffect(() => {
    // Store the score in localStorage whenever it changes
    localStorage.setItem("score", String(score));
  }, [score]);

  useEffect(() => {
    // Store the score in localStorage when the user leaves the page
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("score", String(score));
    });

    // Cleanup the event listener
    return () => {
      window.removeEventListener("beforeunload", () => {
        localStorage.setItem("score", String(score));
      });
    };
  }, [score]);
  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      <div className="container">
        <H1>Spare-Spillet</H1>
        <Space top="large" />
        <P>
          {" "}
          <em>Bruk pengene fra klikkingen til å invistere </em>
        </P>
        <Space bottom="large" />
        <P size="large">kr: {score} ,- </P>
        <Tabs>
          <Tabs.Content title="Klikke-spill">
            <ClickerGame />
          </Tabs.Content>
          <Tabs.Content title="Invisterings-spill">
            <InvestGame />
          </Tabs.Content>
        </Tabs>
      </div>
    </ScoreContext.Provider>
  );
}

export default App;
