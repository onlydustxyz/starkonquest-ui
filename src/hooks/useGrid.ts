import { useCallback, useEffect, useRef, useState } from "react";

import {
  GameEvent,
  GameEventDustDestroyed,
  GameEventDustMoved,
  GameEventDustSpawned,
  GameEventNewTurn,
  GameEventScoreChanged,
  GameEventShipAdded,
  GameEventShipMoved,
} from "./useGameState/types";

export interface DustData {
  dustId: string;
  position: {
    x: number;
    y: number;
  };
  size: "tiny" | "regular" | "big";
}

export interface ShipData {
  shipId: string;
  position: {
    x: number;
    y: number;
  };
  shipIndex: number;
  score: number;
}

const availableDustSize: DustData["size"][] = ["tiny", "regular", "big"];
const sizeByDustId = new Map<string, DustData["size"]>();
const indexByShipId = new Map<string, number>();

const interval = 1000;

export default function useGrid(events: GameEvent[]) {
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [dusts, setDusts] = useState<DustData[]>([]);
  const [ships, setShips] = useState<ShipData[]>([]);
  const [currentTurn, setCurrentTurn] = useState(0);

  const lastDustId = useRef(0);
  const dustIdByPosition = useRef(new Map<string, string>());

  const performedEventIndex = useRef(-1);
  const shipIndex = useRef(0);
  const playInterval = useRef<ReturnType<typeof setInterval>>();

  const dustSpawned = useCallback(
    (gameEvent: GameEventDustSpawned) => {
      const newDustId = getNextDustId();
      setDustIdPosition(newDustId, gameEvent.position);

      setDusts(dusts => {
        return [
          ...dusts,
          {
            dustId: newDustId,
            position: gameEvent.position,
            size: getOrSetSizeByDustId(newDustId),
          },
        ];
      });
    },
    [setDusts]
  );

  const dustMoved = useCallback(
    (gameEvent: GameEventDustMoved) => {
      const dustId = getDustIdByPosition(gameEvent.previousPosition);
      moveDustIdPosition(dustId, gameEvent.previousPosition, gameEvent.position);

      setDusts(dusts => {
        return dusts.map(dust => {
          if (dust.dustId !== dustId) {
            return dust;
          }

          return {
            ...dust,
            position: gameEvent.position,
          };
        });
      });
    },
    [setDusts]
  );

  const dustDestroyed = useCallback(
    (gameEvent: GameEventDustDestroyed) => {
      const dustId = getDustIdByPosition(gameEvent.position);
      deleteDustPosition(gameEvent.position);

      setDusts(dusts => {
        return dusts.filter(dust => {
          return dust.dustId !== dustId;
        });
      });
    },
    [setDusts]
  );

  const shipAdded = useCallback((gameEvent: GameEventShipAdded) => {
    setShips(ships => {
      return [
        ...ships,
        {
          shipId: gameEvent.shipId,
          position: gameEvent.position,
          shipIndex: getOrSetIndexByShipId(gameEvent.shipId),
          score: 0,
        },
      ];
    });
  }, []);

  const shipMoved = useCallback((gameEvent: GameEventShipMoved) => {
    setShips(ships => {
      return ships.map(ship => {
        if (ship.shipId !== gameEvent.shipId) {
          return ship;
        }

        return {
          ...ship,
          position: gameEvent.position,
        };
      });
    });
  }, []);

  const scoreChanged = useCallback((gameEvent: GameEventScoreChanged) => {
    setShips(ships => {
      return ships.map(ship => {
        if (ship.shipId !== gameEvent.shipId) {
          return ship;
        }

        return {
          ...ship,
          score: gameEvent.score,
        };
      });
    });
  }, []);

  const gameFinished = useCallback(() => {
    setTimeout(() => {
      setIsGameFinished(true);
      setIsPlaying(false);
    }, interval);
  }, []);

  const newTurn = useCallback((gameEvent: GameEventNewTurn) => {
    setCurrentTurn(gameEvent.turnNumber);
  }, []);

  const performNextMove = useCallback(() => {
    const internalPerform = function () {
      performedEventIndex.current += 1;

      if (events.length < performedEventIndex.current) {
        return;
      }

      const newEvent = events[performedEventIndex.current];

      if (!newEvent) {
        return;
      }

      switch (newEvent.key) {
        case "dust_spawned":
          dustSpawned(newEvent);
          break;
        case "dust_moved":
          dustMoved(newEvent);
          break;
        case "dust_destroyed":
          dustDestroyed(newEvent);
          break;
        case "ship_added":
          shipAdded(newEvent);
          break;
        case "ship_moved":
          shipMoved(newEvent);
          break;
        case "score_changed":
          scoreChanged(newEvent);
          break;
        case "game_finished":
          gameFinished();
          break;
        case "new_turn":
          newTurn(newEvent);
          break;
      }

      const nextEvent = events[performedEventIndex.current + 1] || null;

      if (nextEvent) {
        const newEventKeyPrefix = newEvent.key.split("_")[0];
        const nextEventKeyPrefix = nextEvent.key.split("_")[0];

        if (!["new_turn", "game_finished"].includes(newEvent.key)) {
          internalPerform();
        }
      }
    };

    internalPerform();
  }, [events, performedEventIndex]);

  useEffect(() => {
    if (isPlaying) {
      performNextMove();
      playInterval.current = setInterval(performNextMove, interval);
    } else if (playInterval.current) {
      clearInterval(playInterval.current);
    }
    return () => {
      if (playInterval.current) {
        clearInterval(playInterval.current);
        playInterval.current = undefined;
      }
    };
  }, [performNextMove, isPlaying]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const resetAndPlay = useCallback(() => {
    performedEventIndex.current = -1;
    play();
    setDusts([]);
    setShips([]);
    setCurrentTurn(0);
    setIsGameFinished(false);
  }, [play]);

  return { dusts, ships, isGameFinished, play, pause, resetAndPlay, isPlaying, currentTurn };

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

    const newShipIndex = getNextShipIndex();
    indexByShipId.set(shipId, newShipIndex);

    return newShipIndex;
  }

  function getRandomSize() {
    return availableDustSize[Math.floor(Math.random() * availableDustSize.length)];
  }

  function getNextShipIndex() {
    return shipIndex.current++;
  }

  function getDustIdByPosition(position: DustData["position"]) {
    const key = buildPositionKey(position);

    if (!dustIdByPosition.current.has(key)) {
      throw new Error("Error, can't retrieve dust from position : " + key);
    }

    return dustIdByPosition.current.get(key) as string;
  }

  function moveDustIdPosition(
    dustId: DustData["dustId"],
    previousPosition: DustData["position"],
    position: DustData["position"]
  ) {
    const previousKey = buildPositionKey(previousPosition);
    const key = buildPositionKey(position);

    dustIdByPosition.current.delete(previousKey);
    dustIdByPosition.current.set(key, dustId);
  }

  function setDustIdPosition(dustId: DustData["dustId"], position: DustData["position"]) {
    const key = buildPositionKey(position);

    dustIdByPosition.current.set(key, dustId);
  }

  function deleteDustPosition(position: DustData["position"]) {
    const key = buildPositionKey(position);

    dustIdByPosition.current.delete(key);
  }

  function getNextDustId() {
    lastDustId.current++;
    return lastDustId.current.toString();
  }

  function buildPositionKey(position: DustData["position"]) {
    return `${position.x}-${position.y}`;
  }
}
