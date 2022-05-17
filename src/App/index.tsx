import { InjectedConnector, StarknetProvider } from "@starknet-react/core";
import { Provider } from "starknet";

import config from "src/config";

import AppRoutes from "./Routes";

export default function App() {
  const connectors = [new InjectedConnector()];
  const defaultProvider = new Provider({ baseUrl: config.PROVIDER_HOSTNAME });

  return (
    <StarknetProvider connectors={connectors} defaultProvider={defaultProvider} autoConnect>
      <AppRoutes />
    </StarknetProvider>
  );
}
