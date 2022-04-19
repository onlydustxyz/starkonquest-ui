import { useContext } from "react";

import { context as GameContext } from "./context";
import provider from "./provider";

export default function useGameState() {
  const {
    account,
    gameStateReady,
    turnIndex,
    gameStarted,
    turnState,
    gridSize,
    score,
    turnLoading,
    setTurnLoading,
    nextTurn,
  } = useContext(GameContext);

  return {
    account,
    gameStateReady,
    turnIndex,
    gameStarted,
    turnState,
    gridSize,
    score,
    turnLoading,
    setTurnLoading,
    nextTurn,
  };
}

export const GameProvider = provider;
