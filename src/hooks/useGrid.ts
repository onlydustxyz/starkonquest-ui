import { useCallback, useEffect, useState } from "react";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import BN from "bn.js";

import useSpaceContract from "./useSpaceContract";
import useGameState from "./useGameState";
import { TurnState } from "./useGameState/context";

export interface DustData {
  dustId: string;
  position: {
    x: BN;
    y: BN;
  };
  size: "tiny" | "regular" | "big";
}

export interface ShipData {
  shipId: string;
  position: {
    x: BN;
    y: BN;
  };
  shipIndex: number;
}

const availableDustSize: DustData["size"][] = ["tiny", "regular", "big"];
const sizeByDustId = new Map<string, DustData["size"]>();
const indexByShipId = new Map<string, number>();
let shipIndex = 0;

export default function useGrid() {
  const { contract: spaceContract } = useSpaceContract();
  const [, setGridLoading] = useState(false);
  const [dusts, setDusts] = useState<DustData[]>([]);
  const [ships, setShips] = useState<ShipData[]>([]);

  const { gridSize, setTurnLoading } = useGameState();

  const [gridReady, setGridReady] = useState(false);

  const refreshGrid = useCallback(async () => {
    if (!spaceContract || !gridSize) {
      return;
    }

    setGridLoading(true);

    const newDusts: DustData[] = [];
    const newShips: ShipData[] = [];

    let isEnd = false;

    let lastPosX: BN = new BN(0, 10);
    let lastPosY: BN = new BN(-1, 10);

    while (!isEnd) {
      try {
        const res = await spaceContract.call("get_first_non_empty_cell", [lastPosX, lastPosY.add(new BN(1, 10))]);

        const shipId = res[0].ship.toString(10) as string;

        const dustId = uint256ToBN(res[0].dust_id).toString(10);

        const positionX = res[0].position.x as BN;
        const positionY = res[0].position.y as BN;

        lastPosX = positionX;
        lastPosY = positionY;

        if (positionX.toNumber() >= gridSize) {
          isEnd = true;
          break;
        }

        if (dustId !== "0") {
          newDusts.push({
            dustId,
            position: {
              x: positionX,
              y: positionY,
            },
            size: getOrSetSizeByDustId(dustId),
          });
        } else if (shipId !== "0") {
          newShips.push({
            shipId,
            position: {
              x: positionX,
              y: positionY,
            },
            shipIndex: getOrSetIndexByShipId(shipId),
          });
        }
      } catch (error) {
        console.warn(error);
      }
    }

    if (!gridReady) {
      setGridReady(true);
    }

    setDusts(newDusts);
    setShips(newShips);

    setGridLoading(false);
    setTurnLoading(false);
  }, [gridSize, spaceContract]);

  return { dusts, ships, refreshGrid, gridReady };

  function getOrSetSizeByDustId(dustId: string) {
    if (sizeByDustId.has(dustId)) {
      return sizeByDustId.get(dustId) as DustData["size"];
    }

    const dustSize: DustData["size"] = getRandomSize();
    sizeByDustId.set(dustId, dustSize);

    return dustSize;
  }

  function getOrSetIndexByShipId(shipId: string) {
    if (indexByShipId.has(shipId)) {
      return indexByShipId.get(shipId) as number;
    }

    const shipIndex = getNextShipIndex();
    indexByShipId.set(shipId, getNextShipIndex());

    return shipIndex;
  }

  function getRandomSize() {
    return availableDustSize[Math.floor(Math.random() * availableDustSize.length)];
  }

  function getNextShipIndex() {
    return ++shipIndex;
  }
}
