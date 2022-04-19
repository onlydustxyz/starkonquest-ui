import { useStarknet } from "@starknet-react/core";

import ConnectScreen from "src/screens/Connect";
import Game from "src/screens/Game";

export default function UserConnect() {
  const { account } = useStarknet();

  if (!account) {
    return <ConnectScreen />;
  }

  return <Game />;
}
