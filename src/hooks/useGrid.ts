import { useCallback, useEffect, useRef, useState } from "react";

import {
  GameEvent,
  GameEventDustDestroyed,
  GameEventDustMoved,
  GameEventDustSpawned,
  GameEventGameFinished,
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

export default function useGrid(events: GameEvent[]) {
  const [winner, setWinner] = useState<ShipData["shipId"]>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [dusts, setDusts] = useState<DustData[]>([]);
  const [ships, setShips] = useState<ShipData[]>([]);

  const performedEventIndex = useRef(-1);
  const shipIndex = useRef(0);
  const playInterval = useRef<any>();

  const dustSpawned = useCallback(
    (gameEvent: GameEventDustSpawned) => {
      setDusts(dusts => {
        return [
          ...dusts,
          {
            dustId: gameEvent.dustId,
            position: gameEvent.position,
            size: getOrSetSizeByDustId(gameEvent.dustId),
          },
        ];
      });
    },
    [setDusts]
  );

  const dustMoved = useCallback(
    (gameEvent: GameEventDustMoved) => {
      setDusts(dusts => {
        return dusts.map(dust => {
          if (dust.dustId !== gameEvent.dustId) {
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
      setDusts(dusts => {
        return dusts.filter(dust => {
          return dust.dustId !== gameEvent.dustId;
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

  const gameFinished = useCallback((gameEvent: GameEventGameFinished) => {
    setWinner(gameEvent.winnerShipId);
  }, []);

  const performNextMove = useCallback(() => {
    if (events.length <= performedEventIndex.current) {
      return;
    }

    const newEventIndex = performedEventIndex.current + 1;
    const nextEvent = events[newEventIndex];

    performedEventIndex.current += 1;

    switch (nextEvent.key) {
      case "dust_spawned":
        dustSpawned(nextEvent);
        break;
      case "dust_moved":
        dustMoved(nextEvent);
        break;
      case "dust_destroyed":
        dustDestroyed(nextEvent);
        break;
      case "ship_added":
        shipAdded(nextEvent);
        break;
      case "ship_moved":
        shipMoved(nextEvent);
        break;
      case "score_changed":
        scoreChanged(nextEvent);
        break;
      case "game_finished":
        gameFinished(nextEvent);
        break;
    }
  }, [events, performedEventIndex]);

  useEffect(() => {
    if (isPlaying) {
      playInterval.current = setInterval(performNextMove, 1000);
    } else if (playInterval.current) {
      clearInterval(playInterval.current);
    }
    return () => {
      if (playInterval.current) {
        clearInterval(playInterval.current);
        playInterval.current = null;
      }
    };
  }, [performNextMove, isPlaying]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  return { dusts, ships, winner, play, pause, isPlaying };

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
}
