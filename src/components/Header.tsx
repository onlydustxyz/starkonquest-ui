import cn from "classnames";

import Button from "./Button";
import useGameState from "src/hooks/useGameState";
import { CSSProperties, ReactNode } from "react";
import { ShipData } from "src/hooks/useGrid";
import shipImages from "src/assets/img/spaceships";

export interface HeaderProps {
  start: () => void;
  pause: () => void;
  replay: () => void;
  ships: ShipData[];
  isGameFinished: boolean;
  isPlaying: boolean;
  className?: string;
  currentTurn: number;
  maxTurn: number | undefined;
  renderTitle?: () => ReactNode;

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
  isGameFinished,
  currentTurn,
  maxTurn,
  renderTitle,
}: HeaderProps) {
  const { gameStateReady } = useGameState();

  return (
    <div
      style={style}
      className={cn(
        "w-full max-w-screen-lg lg:mx-auto mx-8 bg-opacity-60 rounded-lg text-snow flex flex-col mt-8",
        className
      )}
    >
      {gameStateReady ? renderGameData() : renderGameLoading()}
    </div>
  );

  function renderGameLoading() {
    return <div>Loading ...</div>;
  }

  function renderGameData() {
    return (
      <>
        {renderTitle && <div className="mb-8">{renderTitle()}</div>}
        <div className="flex flex-row h-[92px]">
          <div className="flex-grow mt-4">
            <div className="flex flex-row ml-8">{ships.map(renderShip)}</div>
            <div className="mt-2 ml-8 mb-4">
              Current turn : {currentTurn} / {maxTurn}
            </div>
          </div>
          <div className="self-center flex flex-col items-end">
            <div>{renderControls()}</div>
          </div>
        </div>
      </>
    );
  }

  function renderShip(ship: ShipData) {
    const url = shipImages[ship.shipIndex] || shipImages[0];

    return (
      <div key={ship.shipId} className="flex flex-row mr-10">
        <img className="mr-2" src={url} width="26px" height="26px" /> {ship.score}
      </div>
    );
  }

  function renderControls() {
    if (isPlaying) {
      return (
        <Button theme="secondary" onClick={pause}>
          Pause
        </Button>
      );
    } else if (isGameFinished) {
      return <Button onClick={replay}>Replay game</Button>;
    } else {
      return <Button onClick={start}>Play game</Button>;
    }
  }
}
