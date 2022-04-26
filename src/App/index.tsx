import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Provider } from "starknet";

const GameScreen = lazy(() => import("src/screens/Game"));

export default function App() {
  const connectors = [new InjectedConnector()];
  const defaultProvider = new Provider({ baseUrl: "http://localhost:5000" });

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
        </Routes>
      </BrowserRouter>
    </StarknetProvider>
  );
}
