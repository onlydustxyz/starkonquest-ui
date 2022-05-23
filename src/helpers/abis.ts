import battleAbi from "src/abis/battle.json";
import {
  GameEvent,
  GameEventDustDestroyed,
  GameEventDustMoved,
  GameEventDustSpawned,
  GameEventGameFinished,
  GameEventNewTurn,
  GameEventScoreChanged,
  GameEventShipAdded,
  GameEventShipMoved,
} from "src/hooks/useGameState/types";
import { decodeToNumber } from "src/utils/felt";
import { BlockNumber, Status } from "starknet";
import { getSelectorFromName } from "starknet/dist/utils/hash";
import { hexToDecimalString } from "starknet/dist/utils/number";

export interface TransactionEvent {
  from_address: string;
  keys: string[];
  data: string[];
}

export interface TransactionReceipt {
  status: Status;
  transaction_hash: string;
  transaction_index: number;
  block_hash: string;
  block_number: BlockNumber;
  l2_to_l1_messages: string[];
  events: TransactionEvent[];
}

const eventNameByKey = new Map<string, string>();
const functionNameByKey = new Map<string, string>();

function loadAbi() {
  battleAbi.forEach(abiItem => {
    if (abiItem.type === "event" && abiItem.name) {
      eventNameByKey.set(getSelectorFromName(abiItem.name), abiItem.name);
    }

    if (abiItem.type === "function" && abiItem.name) {
      functionNameByKey.set(getSelectorFromName(abiItem.name), abiItem.name);
    }
  });
}

export function getEventNameFromKey(key: string) {
  if (eventNameByKey.size === 0 && functionNameByKey.size === 0) {
    loadAbi();
  }

  return eventNameByKey.get(key) || "anonymous";
}

export function getFunctionNameFromKey(key: string) {
  if (eventNameByKey.size === 0 && functionNameByKey.size === 0) {
    loadAbi();
  }

  return functionNameByKey.get(key) || "anonymous";
}

const decodeFunctionByName: Record<GameEvent["key"], (event: TransactionEvent) => GameEvent> = {
  dust_spawned: decodeEventDustSpawned,
  dust_moved: decodeEventDustMoved,
  dust_destroyed: decodeEventDustDestroyed,
  ship_added: decodeEventShipAdded,
  ship_moved: decodeEventShipMoved,
  score_changed: decodeEventScoreChanged,
  new_turn: decodeEventNewTurn,
  game_finished: decodeEventGameFinished,
};

export function decodeEvent(event: TransactionEvent) {
  const eventName = getEventNameFromKey(event.keys[0]) as GameEvent["key"];

  if (decodeFunctionByName[eventName]) {
    return decodeFunctionByName[eventName](event);
  }

  return null;
}

export function decodeEventDustSpawned(event: TransactionEvent): GameEventDustSpawned {
  return {
    key: "dust_spawned",
    direction: {
      x: decodeToNumber(event.data[1]),
      y: decodeToNumber(event.data[2]),
    },
    position: {
      x: decodeToNumber(event.data[3]),
      y: decodeToNumber(event.data[4]),
    },
  };
}

export function decodeEventDustMoved(event: TransactionEvent): GameEventDustMoved {
  return {
    key: "dust_moved",
    previousPosition: {
      x: decodeToNumber(event.data[1]),
      y: decodeToNumber(event.data[2]),
    },
    position: {
      x: decodeToNumber(event.data[3]),
      y: decodeToNumber(event.data[4]),
    },
  };
}

export function decodeEventDustDestroyed(event: TransactionEvent): GameEventDustDestroyed {
  return {
    key: "dust_destroyed",
    position: {
      x: decodeToNumber(event.data[1]),
      y: decodeToNumber(event.data[2]),
    },
  };
}

export function decodeEventShipAdded(event: TransactionEvent): GameEventShipAdded {
  return {
    key: "ship_added",
    shipId: hexToDecimalString(event.data[1]),
    position: {
      x: decodeToNumber(event.data[2]),
      y: decodeToNumber(event.data[3]),
    },
  };
}

export function decodeEventShipMoved(event: TransactionEvent): GameEventShipMoved {
  return {
    key: "ship_moved",
    shipId: hexToDecimalString(event.data[1]),
    previousPosition: {
      x: decodeToNumber(event.data[2]),
      y: decodeToNumber(event.data[3]),
    },
    position: {
      x: decodeToNumber(event.data[4]),
      y: decodeToNumber(event.data[5]),
    },
  };
}

export function decodeEventScoreChanged(event: TransactionEvent): GameEventScoreChanged {
  return {
    key: "score_changed",
    shipId: hexToDecimalString(event.data[1]),
    score: decodeToNumber(event.data[2]),
  };
}

export function decodeEventNewTurn(event: TransactionEvent): GameEventNewTurn {
  return {
    key: "new_turn",
    turnNumber: decodeToNumber(event.data[1]),
  };
}

export function decodeEventGameFinished(): GameEventGameFinished {
  return {
    key: "game_finished",
  };
}
