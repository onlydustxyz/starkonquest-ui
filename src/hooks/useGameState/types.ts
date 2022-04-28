export interface GamePosition {
  x: number;
  y: number;
}

export interface GameDirection {
  x: number;
  y: number;
}
export interface GameEventDustSpawned {
  key: "dust_spawned";
  direction: GameDirection;
  position: GamePosition;
}

export interface GameEventDustDestroyed {
  key: "dust_destroyed";
  position: GamePosition;
}

export interface GameEventDustMoved {
  key: "dust_moved";
  previousPosition: GamePosition;
  position: GamePosition;
}

export interface GameEventShipAdded {
  key: "ship_added";
  shipId: string;
  position: GamePosition;
}

export interface GameEventShipMoved {
  key: "ship_moved";
  shipId: string;
  previousPosition: GamePosition;
  position: GamePosition;
}

export interface GameEventScoreChanged {
  key: "score_changed";
  shipId: string;
  score: number;
}

export interface GameEventGameFinished {
  key: "game_finished";
}

export interface GameEventNewTurn {
  key: "new_turn";
  turnNumber: number;
}

export type GameEvent =
  | GameEventDustSpawned
  | GameEventDustDestroyed
  | GameEventDustMoved
  | GameEventShipAdded
  | GameEventShipMoved
  | GameEventScoreChanged
  | GameEventGameFinished
  | GameEventNewTurn;
