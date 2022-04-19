import { CSSProperties, useMemo } from "react";

import Dust from "src/components/Dust";
import Ship from "src/components/Ship";
import ContentContainer from "src/components/ContentContainer";
import { DustData, ShipData } from "src/hooks/useGrid";

export interface BoardProps {
  gridSize: number;
  boardSize: number;
  dusts: DustData[];
  ships: ShipData[];
  style?: CSSProperties;
}

export default function Board({ dusts, ships, boardSize, gridSize, style }: BoardProps) {
  const boxSize = useMemo(() => {
    return Math.floor(boardSize / gridSize);
  }, [boardSize, gridSize]);

  return (
    <ContentContainer className="bg-space relative" style={style}>
      <div className="bg-space-dark-blue bg-opacity-50 rounded-xl shadow-inner shadow-white relative text-white overflow-hidden w-full h-full">
        {dusts.map(dust => {
          return <Dust key={dust.dustId} boxSize={boxSize} x={dust.position.x} y={dust.position.y} size={dust.size} />;
        })}
        {ships.map(ship => {
          return <Ship key={ship.shipId} boxSize={boxSize} shipData={ship} />;
        })}
      </div>
    </ContentContainer>
  );
}
