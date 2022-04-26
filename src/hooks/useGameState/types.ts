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
  dustId: string;
  direction: GameDirection;
  position: GamePosition;
}

export interface GameEventDustDestroyed {
  key: "dust_destroyed";
  dustId: string;
  position: GamePosition;
}

export interface GameEventDustMoved {
  key: "dust_moved";
  dustId: string;
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

export const testEvents: GameEvent[] = [
  {
    key: "new_turn",
    turnNumber: 1,
  },
  {
    key: "ship_added",
    shipId: "1",
    position: {
      x: 5,
      y: 5,
    },
  },
  {
    key: "ship_added",
    shipId: "2",
    position: {
      x: 12,
      y: 16,
    },
  },
  {
    key: "ship_added",
    shipId: "3",
    position: {
      x: 0,
      y: 1,
    },
  },
  {
    key: "dust_spawned",
    dustId: "1",
    direction: {
      x: -1,
      y: 1,
    },
    position: {
      x: 0,
      y: 5,
    },
  },
  {
    key: "new_turn",
    turnNumber: 2,
  },
  {
    key: "ship_moved",
    shipId: "1",
    previousPosition: {
      x: 5,
      y: 5,
    },
    position: {
      x: 4,
      y: 6,
    },
  },
  {
    key: "ship_moved",
    shipId: "2",
    previousPosition: {
      x: 12,
      y: 16,
    },
    position: {
      x: 11,
      y: 15,
    },
  },
  {
    key: "ship_moved",
    shipId: "3",
    previousPosition: {
      x: 0,
      y: 1,
    },
    position: {
      x: 0,
      y: 0,
    },
  },
  {
    key: "dust_moved",
    dustId: "1",
    previousPosition: {
      x: 0,
      y: 5,
    },
    position: {
      x: 1,
      y: 6,
    },
  },
  {
    key: "dust_spawned",
    dustId: "2",
    direction: {
      x: -1,
      y: 1,
    },
    position: {
      x: 19,
      y: 15,
    },
  },
  {
    key: "new_turn",
    turnNumber: 3,
  },
  {
    key: "ship_moved",
    shipId: "1",
    previousPosition: {
      x: 4,
      y: 6,
    },
    position: {
      x: 3,
      y: 7,
    },
  },
  {
    key: "ship_moved",
    shipId: "2",
    previousPosition: {
      x: 11,
      y: 15,
    },
    position: {
      x: 12,
      y: 15,
    },
  },
  {
    key: "dust_moved",
    dustId: "1",
    previousPosition: {
      x: 1,
      y: 6,
    },
    position: {
      x: 2,
      y: 7,
    },
  },
  {
    key: "dust_moved",
    dustId: "2",
    previousPosition: {
      x: 19,
      y: 15,
    },
    position: {
      x: 18,
      y: 16,
    },
  },
  {
    key: "dust_spawned",
    dustId: "3",
    direction: {
      x: 1,
      y: 1,
    },
    position: {
      x: 6,
      y: 1,
    },
  },
  {
    key: "score_changed",
    shipId: "1",
    score: 2,
  },
  {
    key: "new_turn",
    turnNumber: 4,
  },
  {
    key: "dust_destroyed",
    dustId: "2",
    position: {
      x: 18,
      y: 16,
    },
  },
  { key: "game_finished" },
];
