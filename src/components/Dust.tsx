import { useMemo } from "react";
import cn from "classnames";
import BN from "bn.js";
import * as HoverCard from "@radix-ui/react-hover-card";

import { DustData } from "src/hooks/useGrid";

export interface DustProps {
  boxSize: number;
  x: BN;
  y: BN;
  size: DustData["size"];
}

export default function Dust({ boxSize, x, y, size }: DustProps) {
  const containerStyle = useMemo(() => {
    return {
      left: x.toNumber() * boxSize,
      top: y.toNumber() * boxSize,
      width: `${boxSize}px`,
      height: `${boxSize}px`,
    };
  }, [boxSize, x, y]);

  const dustClassName = useMemo(() => {
    switch (size) {
      case "tiny":
        return "w-[3px] h-[3px]";
      case "big":
        return "w-[5px] h-[5px]";
      case "regular":
      default:
        return "w-[4px] h-[4px]";
    }
  }, [size]);

  const filterAnimation = useMemo(() => {
    return `animate-flicker${Math.ceil(Math.random() * 3 + 1)} animate-dust-color`;
  }, []);

  return (
    <HoverCard.Root>
      <div
        style={containerStyle}
        className={cn("absolute flex items-center justify-center  transition-all duration-700 ease-in-out")}
      >
        <HoverCard.Trigger asChild>
          <div className="w-full h-full flex items-center justify-center">
            <div className={cn("rounded", filterAnimation, dustClassName)}></div>
          </div>
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
