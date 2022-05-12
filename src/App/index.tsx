import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "starknet";

import config from "src/config";

const GameScreen = lazy(() => import("src/screens/Game"));
const TournamentScreen = lazy(() => import("src/screens/Tournament"));

export default function App() {
  const connectors = [new InjectedConnector()];
  const defaultProvider = new Provider({ baseUrl: config.PROVIDER_HOSTNAME });

  return (
    <StarknetProvider connectors={connectors} defaultProvider={defaultProvider} autoConnect>
      <BrowserRouter>
        <Routes>
          <Route
            path="/game/:transactionHash"
            element={
              <Suspense fallback={<>...</>}>
                <GameScreen />
              </Suspense>
            }
          />
          <Route
            path="/tournament/:tournamentAddress"
            element={
              <Suspense fallback={<>...</>}>
                <TournamentScreen />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </StarknetProvider>
  );
}
