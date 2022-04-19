import { useMemo } from "react";
import cn from "classnames";
import BN from "bn.js";
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
      left: (x.toNumber() + 0.5) * boxSize,
      top: (y.toNumber() + 0.5) * boxSize,
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
    <div
      style={containerStyle}
      className={cn(
        "absolute flex items-center justify-center rounded bg-light-blue transition-all duration-700 ease-in-out",
        filterAnimation,
        dustClassName
      )}
    ></div>
  );
}
