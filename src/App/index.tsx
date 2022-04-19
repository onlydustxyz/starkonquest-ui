import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { Provider } from "starknet";

import UserConnect from "./UserConnect";

export default function App() {
  const connectors = [new InjectedConnector()];
  const defaultProvider = new Provider({ baseUrl: "http://localhost:5000" });

  return (
    <StarknetProvider connectors={connectors} defaultProvider={defaultProvider} autoConnect>
      <UserConnect />
    </StarknetProvider>
  );
}
