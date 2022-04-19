import { useEffect, useMemo, useState } from "react";
import { usePrevious } from "react-use";
import cn from "classnames";
import * as Popover from "@radix-ui/react-popover";

import { ShipData } from "src/hooks/useGrid";
import ships from "src/assets/img/spaceships";

import styles from "./Ship.module.css";
import BN from "bn.js";

export interface ShipProps {
  boxSize: number;
  shipData: ShipData;
  x: BN;
  y: BN;
}

export default function Ship({ boxSize, shipData, x, y }: ShipProps) {
  const previousPosition = usePrevious({ x: shipData.position.x, y: shipData.position.y });
  const [angle, setAngle] = useState(0);

  const shipImage = useMemo(() => {
    return ships[shipData.shipIndex] || ships[1];
  }, [shipData.shipIndex]);

  useEffect(() => {
    const prevX = previousPosition?.x.toNumber() || 0;
    const prevY = previousPosition?.y.toNumber() || 0;

    const newX = shipData.position.x.toNumber();
    const newY = shipData.position.y.toNumber();

    if (newX === prevX && newY === prevY) {
      return;
    }

    const deltaX = newX - prevX;
    const deltaY = newY - prevY;

    const rad = Math.atan2(deltaY, deltaX);

    setAngle(rad * (180 / Math.PI));
  }, [shipData.position.x, shipData.position.y, previousPosition?.x, previousPosition?.y]);

  const containerStyle = useMemo(() => {
    return {
      transform: `rotate(${angle}deg)`,
      left: (shipData.position.x.toNumber() + 0.5) * boxSize,
      top: (shipData.position.y.toNumber() + 0.5) * boxSize,
    };
  }, [angle, boxSize, shipData.position.x, shipData.position.y]);

  return (
    <Popover.Root>
      <Popover.Trigger>
        <div
          style={containerStyle}
          className={cn(
            "absolute flex items-center justify-center transition-all duration-700 ease-in-out",
            styles.ship
          )}
        >
          <Popover.Anchor>
            <img src={shipImage} width={`${boxSize}px`} height={`${boxSize}px`} />
          </Popover.Anchor>
        </div>
      </Popover.Trigger>
      <Popover.Content>
        <div className="px-4 py-2 bg-white bg-opacity-30 rounded flex flex-col text-center mt-2">
          <span>Position</span>
          <span>
            ({x.toString(10)}, {y.toString(10)})
          </span>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
}
