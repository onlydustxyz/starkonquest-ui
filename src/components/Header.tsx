import { useContract, useStarknet, useStarknetCall } from "@starknet-react/core";
import { Abi } from "starknet";
import cn from "classnames";

import dustAbi from "src/abis/dust.json";
import config from "src/config";
import { minimizeAddress } from "src/utils/web3";
import Button from "./Button";
import useGameState from "src/hooks/useGameState";
import { TurnState } from "src/hooks/useGameState/context";
import { CSSProperties } from "react";

export interface HeaderProps {
  className?: string;
  style?: CSSProperties;
}

export default function Header({ className, style }: HeaderProps) {
  const { account, gameStateReady, turnIndex, gameStarted, nextTurn, score, turnState, turnLoading } = useGameState();

  return (
    <div style={style} className={cn("px-4 bg-opacity-60 rounded-lg text-snow flex flex-row", className)}>
      {gameStateReady ? renderGameData() : renderGameLoading()}
    </div>
  );

  function renderGameLoading() {
    return <div>Loading ...</div>;
  }

  function renderGameData() {
    return (
      <>
        <div className="flex-grow">
          <h1 className="text-[32px] font-bold whitespace-nowrap">
            Starknet Onboarding <sub className="text-[20px]">by OnlyDust</sub>
          </h1>
          <div>
            <div>Account : {account && minimizeAddress(account)}</div>
            <div>Score : {score}</div>
          </div>
        </div>
        <div className="self-center flex flex-col items-end">
          <div className="mb-4">Current turn : {turnIndex}</div>
          <div>{renderNextTurnButton()}</div>
        </div>
      </>
    );
  }

  function renderNextTurnButton() {
    const label = turnState === TurnState.LOADING ? "Loading..." : gameStarted ? "Next turn" : "Start game";

    return (
      <Button onClick={nextTurn} disabled={turnLoading}>
        {label}
      </Button>
    );
  }
}
