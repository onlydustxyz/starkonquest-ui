import { createContext } from "react";
import { number } from "starknet";

export enum TurnState {
  NOT_STARTED,
  LOADING,
  READY,
  DONE,
  ERROR,
}

interface GameContext {
  gameStateReady: boolean;
  turnIndex: number | undefined;
  gameStarted: boolean;
  turnState: TurnState;
  gridSize: number | undefined;
  score: number;
  account: string | undefined;
  turnLoading: boolean;
  setTurnLoading: (value: boolean) => void;
  nextTurn: () => void;
}

const defaultGameContext: GameContext = {
  gameStateReady: false,
  turnIndex: undefined,
  gameStarted: false,
  turnState: TurnState.NOT_STARTED,
  gridSize: undefined,
  score: 0,
  account: undefined,
  turnLoading: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTurnLoading: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  nextTurn: () => {},
};

const GameContext = createContext(defaultGameContext);

export const context = GameContext;
