import { H1, Tabs } from "@dnb/eufemia";
import ClickerGame from "./components/clickerGame";

function App() {
  return (
    <>
      <div className="container">
        <H1>Spare-Spillet</H1>

        <Tabs>
          <Tabs.Content title="Klikke-spill">
            <ClickerGame />
          </Tabs.Content>
          <Tabs.Content title="Invisterings-spill">
            <ClickerGame />
          </Tabs.Content>
        </Tabs>
      </div>
    </>
  );
}

export default App;
