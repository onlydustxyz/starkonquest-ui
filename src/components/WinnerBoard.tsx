import { useMemo } from "react";

import { ShipData } from "src/hooks/useGrid";
import shipImages from "src/assets/img/spaceships";

interface WinnerBoardProps {
  winner: ShipData["shipId"];
  ships: ShipData[];
}
export default function WinnerBoard({ winner, ships }: WinnerBoardProps) {
  const orderedShips = useMemo(() => {
    return ships.sort((ship1, ship2) => {
      return ship1.score > ship2.score ? -1 : ship1.score === ship2.score ? 0 : 1;
    });
  }, [ships]);

  return (
    <div className="absolute z-50 top-0 left-0 w-full h-full bg-space-blue bg-opacity-75 text-snow flex flex-col items-center justify-center">
      <div className="font-bold text-2xl mb-8">Game results</div>
      <ul>
        {orderedShips.map(ship => {
          return (
            <li key={ship.shipId} className="flex flex-row items-center text-2xl">
              {renderShip(ship.shipIndex)} {ship.score}
            </li>
          );
        })}
      </ul>
    </div>
  );

  function renderShip(index: number) {
    const url = shipImages[index] || shipImages[0];

    return <img className="mr-6" src={url} width="42px" height="42px" />;
  }
}
