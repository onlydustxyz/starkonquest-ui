import { useStarknet } from "@starknet-react/core";
import { ReactNode, useEffect, useState } from "react";

import useSpaceContract from "../useSpaceContract";
import { context as GameContext } from "./context";
import { GameEvent, testEvents } from "./types";

interface GameProviderProps {
  children: ReactNode;
}

export default function GameProvider({ children }: GameProviderProps) {
  const { account } = useStarknet();

  const [gridSize, setGridSize] = useState<number>();
  const [gameStateReady, setGameStateReady] = useState(false);

  const [events, setEvents] = useState<GameEvent[]>(testEvents);

  const [turnLoading, setTurnLoading] = useState(false);

  // const { contract: spaceContract } = useSpaceContract();

  // useEffect(() => {
  //   (async function () {
  //     if (!spaceContract) {
  //       return;
  //     }

  //     const res = await spaceContract.call("get_grid_size");

  //     setGridSize(res[0].toNumber());
  //   })();
  // }, [spaceContract]);

  useEffect(() => {
    setGridSize(20);
  }, []);

  const score = 0;

  useEffect(() => {
    if (gridSize) {
      setGameStateReady(true);
    }
  }, [gridSize]);

  return (
    <GameContext.Provider
      value={{
        gameStateReady,
        gridSize,
        score,
        account,
        turnLoading,
        setTurnLoading,
        events,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
