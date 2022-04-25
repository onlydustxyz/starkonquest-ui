import { useContext } from "react";

import { context as GameContext } from "./context";
import provider from "./provider";

export default function useGameState() {
  const { account, gameStateReady, turnIndex, gameStarted, gridSize, score, turnLoading, setTurnLoading, events } =
    useContext(GameContext);

  return {
    account,
    gameStateReady,
    turnIndex,
    gameStarted,
    gridSize,
    score,
    turnLoading,
    setTurnLoading,
    events,
  };
}

export const GameProvider = provider;