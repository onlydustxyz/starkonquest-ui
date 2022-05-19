import { forwardRef, Ref, useMemo } from "react";

import Dust from "src/components/Dust";
import Ship from "src/components/Ship";
import ContentContainer from "src/components/ContentContainer";
import { DustData, ShipData } from "src/hooks/useGrid";
import WinnerBoard from "./WinnerBoard";

export interface BoardProps {
  ref: Ref<typeof Board>;
  gridSize: number;
  boardSize: number;
  isGameFinished: boolean;
  dusts: DustData[];
  ships: ShipData[];
  className?: string;
}

function Board({ className, dusts, ships, isGameFinished, boardSize, gridSize }: BoardProps, ref: Ref<HTMLDivElement>) {
  const boxSize = useMemo(() => {
    return Math.floor(boardSize / gridSize);
  }, [boardSize, gridSize]);

  const boardStyle = useMemo(() => {
    return {
      height: `${boardSize}px`,
      width: `${boardSize}px`,
    };
  }, [boardSize]);

  return (
    <div className={className} ref={ref}>
      <ContentContainer className="bg-space relative p-0" style={boardStyle} ref={ref}>
        {renderWinnerBoard()}
        <div className="bg-space-dark-blue bg-opacity-50 rounded-xl shadow-inner shadow-white relative text-white overflow-hidden w-full h-full">
          {dusts.map(dust => {
            return (
              <Dust key={dust.dustId} boxSize={boxSize} x={dust.position.x} y={dust.position.y} size={dust.size} />
            );
          })}
          {ships.map(ship => {
            return <Ship key={ship.shipId} boxSize={boxSize} shipData={ship} x={ship.position.x} y={ship.position.y} />;
          })}
        </div>
      </ContentContainer>
    </div>
  );

  function renderWinnerBoard() {
    if (!isGameFinished) {
      return null;
    }

    return <WinnerBoard ships={ships} />;
  }
}

export default forwardRef(Board);
