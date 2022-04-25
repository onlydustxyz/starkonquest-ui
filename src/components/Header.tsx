import cn from "classnames";

import { minimizeAddress } from "src/utils/web3";
import Button from "./Button";
import useGameState from "src/hooks/useGameState";
import { CSSProperties } from "react";
import { ShipData } from "src/hooks/useGrid";

export interface HeaderProps {
  start: () => void;
  pause: () => void;
  replay: () => void;
  ships: ShipData[];
  winner: ShipData["shipId"] | undefined;
  isPlaying: boolean;
  className?: string;
  currentTurn: number;

  style?: CSSProperties;
}

export default function Header({
  className,
  style,
  isPlaying,
  pause,
  start,
  replay,
  ships,
  winner,
  currentTurn,
}: HeaderProps) {
  const { account, gameStateReady, score } = useGameState();

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
            Starkonquest <sub className="text-[20px]">by OnlyDust</sub>
          </h1>
          <div>
            <div>Account : {account && minimizeAddress(account)}</div>
            <div>Score : {score}</div>
          </div>
        </div>
        <div className="self-center flex flex-col items-end">
          <div className="mb-4">Current turn : {currentTurn}</div>
          <div>{renderControls()}</div>
        </div>
      </>
    );
  }

  function renderControls() {
    if (isPlaying) {
      return (
        <Button theme="secondary" onClick={pause}>
          Pause
        </Button>
      );
    } else if (winner) {
      return <Button onClick={replay}>Replay game</Button>;
    } else {
      return <Button onClick={start}>Play game</Button>;
    }
  }
}
