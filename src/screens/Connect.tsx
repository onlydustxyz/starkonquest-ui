import { InjectedConnector, useStarknet } from "@starknet-react/core";

import Button from "src/components/Button";
import { useCallback, useState } from "react";

export default function ConnectScreen() {
  const [connecting, setConnecting] = useState(false);
  const { connect } = useStarknet();

  const onConnect = useCallback(() => {
    setConnecting(true);
    connect(new InjectedConnector());
  }, [connect, setConnecting]);

  return (
    <div className="container flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-snow text-[32px] font-bold whitespace-nowrap mb-16">
        Starknet Onboarding <sub className="text-[20px]">by OnlyDust</sub>
      </h1>
      <div className="mb-16">{renderButton()}</div>
    </div>
  );

  function renderButton() {
    if (connecting) {
      return <Button disabled>Loading</Button>;
    }

    return <Button onClick={onConnect}>Connect wallet</Button>;
  }
}
