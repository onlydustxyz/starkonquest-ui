import { useContext } from "react";

import { context as GameContext } from "./context";
import provider from "./provider";

export default function useGameState() {
  const { account, gameStateReady, gridSize, score, turnLoading, setTurnLoading, events } = useContext(GameContext);

  return {
    account,
    gameStateReady,
    gridSize,
    score,
    turnLoading,
    setTurnLoading,
    events,
  };
}

export const GameProvider = provider;
