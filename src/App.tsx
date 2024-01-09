import { createContext, useState, useContext } from "react";
import { H1, Tabs } from "@dnb/eufemia";
import ClickerGame from "./components/clickerGame";
import InvestGame from "./components/investGame";

const ScoreContext = createContext(0);

export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScore must be used within a ScoreProvider");
  }
  return context;
}

function App() {
  const [score, setScore] = useState(0);
  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      <div className="container">
        <H1>Spare-Spillet</H1>

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
