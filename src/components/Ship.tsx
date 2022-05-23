import { useMemo } from "react";
import { usePrevious } from "react-use";
import cn from "classnames";
import * as HoverCard from "@radix-ui/react-hover-card";

import { ShipData } from "src/hooks/useGrid";
import ships from "src/assets/img/spaceships";

import styles from "./Ship.module.css";

export interface ShipProps {
  boxSize: number;
  shipData: ShipData;
  x: number;
  y: number;
}

export default function Ship({ boxSize, shipData, x, y }: ShipProps) {
  const previousPositionX = usePrevious(shipData.position.x);
  const previousPositionY = usePrevious(shipData.position.y);

  const shipImage = useMemo(() => {
    return ships[shipData.shipIndex] || ships[0];
  }, [shipData.shipIndex]);

  const angle = useMemo(() => {
    const prevX = previousPositionX || 0;
    const prevY = previousPositionY || 0;

    const newX = shipData.position.x;
    const newY = shipData.position.y;

    if (newX === prevX && newY === prevY) {
      return 0;
    }

    const deltaX = newX - prevX;
    const deltaY = newY - prevY;

    const rad = Math.atan2(deltaY, deltaX);

    return rad * (180 / Math.PI) + 90;
  }, [shipData.position.x, shipData.position.y]);

  const containerStyle = useMemo(() => {
    return {
      transform: `rotate(${angle}deg)`,
      left: shipData.position.x * boxSize,
      top: shipData.position.y * boxSize,
    };
  }, [angle, boxSize, shipData.position.x, shipData.position.y]);

  const imageSize = useMemo(() => {
    return Math.min(120, boxSize);
  }, [boxSize]);

  return (
    <HoverCard.Root>
      <div style={containerStyle} className={cn("absolute flex items-center justify-center ease-in-out", styles.ship)}>
        <HoverCard.Trigger>
          <img src={shipImage} width={`${imageSize}px`} height={`${imageSize}px`} />
        </HoverCard.Trigger>
      </div>
      <HoverCard.Content>
        <div className="px-4 py-2 bg-white bg-opacity-30 rounded flex flex-col text-center mt-2">
          <span>Position</span>
          <span>
            ({x.toString(10)}, {y.toString(10)})
          </span>
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}
