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
  const [gameStarted, setGameStarted] = useState(false);

  const [events, setEvents] = useState<GameEvent[]>(testEvents);

  const [turnLoading, setTurnLoading] = useState(false);

  const { contract: spaceContract } = useSpaceContract();

  useEffect(() => {
    (async function () {
      if (!spaceContract) {
        return;
      }

      const res = await spaceContract.call("get_grid_size");

      setGridSize(res[0].toNumber());
    })();
  }, [spaceContract]);

  const score = 0;

  const turnIndex = 1;

  useEffect(() => {
    if (turnIndex && turnIndex > 0 && gameStarted === false) {
      setGameStarted(true);
    }
  }, [gameStarted, setGameStarted, turnIndex]);

  useEffect(() => {
    if (gridSize) {
      setGameStateReady(true);
    }
  }, [gridSize]);

  return (
    <GameContext.Provider
      value={{
        gameStateReady,
        turnIndex,
        gridSize,
        gameStarted,
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
