import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { GameProvider } from "src/hooks/useGameState";
import Game from "src/screens/Game";
import { Provider } from "starknet";

export default function App() {
  const connectors = [new InjectedConnector()];
  const defaultProvider = new Provider({ baseUrl: "http://localhost:5000" });

  return (
    <StarknetProvider connectors={connectors} defaultProvider={defaultProvider} autoConnect>
      <GameProvider>
        <Game />
      </GameProvider>
    </StarknetProvider>
  );
}
