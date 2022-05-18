import { InjectedConnector, useStarknet } from "@starknet-react/core";

import Button from "src/components/Button";
import { useCallback, useEffect, useState } from "react";

export default function ButtonConnect() {
  const [connecting, setConnecting] = useState(false);
  const { account, connect } = useStarknet();

  const onConnect = useCallback(() => {
    setConnecting(true);
    connect(new InjectedConnector());
  }, [connect, setConnecting]);

  useEffect(() => {
    if (account) {
      setConnecting(false);
    }
  }, [account]);

  if (account) {
    return null;
  }

  if (connecting) {
    return <Button disabled>Loading</Button>;
  }

  return <Button onClick={onConnect}>Connect wallet</Button>;
}
