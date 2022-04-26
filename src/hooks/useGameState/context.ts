import { createContext } from "react";
import { GameEvent } from "./types";

export enum TurnState {
  NOT_STARTED,
  LOADING,
  READY,
  DONE,
  ERROR,
}

interface GameContext {
  gameStateReady: boolean;
  gridSize: number | undefined;
  maxTurn: number | undefined;
  score: number;
  account: string | undefined;
  turnLoading: boolean;
  setTurnLoading: (value: boolean) => void;
  events: GameEvent[];
}

const defaultGameContext: GameContext = {
  gameStateReady: false,
  gridSize: undefined,
  maxTurn: undefined,
  score: 0,
  account: undefined,
  turnLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTurnLoading: () => {},
  events: [],
};

const GameContext = createContext(defaultGameContext);

export const context = GameContext;
