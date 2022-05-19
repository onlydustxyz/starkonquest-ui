import { useStarknet } from "@starknet-react/core";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { decodeEvent, getFunctionNameFromKey, TransactionReceipt } from "src/helpers/abis";
import { decodeToNumber } from "src/utils/felt";
import config from "src/config";

import { context as GameContext } from "./context";
import { GameEvent } from "./types";
import testEvents from "./mock";

interface GameProviderProps {
  children: ReactNode;
  transactionHash: string | undefined;
}

export default function GameProvider({ children, transactionHash }: GameProviderProps) {
  const { account } = useStarknet();

  const [gridSize, setGridSize] = useState<number>();
  const [maxTurn, setMaxTurn] = useState<number>();

  const [events, setEvents] = useState<GameEvent[]>([]);

  const [turnLoading, setTurnLoading] = useState(false);

  useEffect(() => {
    (async function () {
      if (!transactionHash) {
        return;
      }

      if (transactionHash === "0x00") {
        setEvents(testEvents);
        setGridSize(20);
        setMaxTurn(20);
        return;
      }

      const [transactionReceiptResponse, transactionTraceResponse] = await Promise.all([
        fetch(`${config.PROVIDER_HOSTNAME}/feeder_gateway/get_transaction_receipt?transactionHash=${transactionHash}`),
        fetch(`${config.PROVIDER_HOSTNAME}/feeder_gateway/get_transaction_trace?transactionHash=${transactionHash}`),
      ]);

      const jsonReceipt: TransactionReceipt = await transactionReceiptResponse.json();
      const jsonTrace: any = await transactionTraceResponse.json();

      const decodedEvents = jsonReceipt.events.map(decodeEvent).filter(a => !!a) as GameEvent[];

      const playGameCall = findFunctionCallRecursive(jsonTrace.function_invocation.internal_calls, "play_game");

      if (playGameCall.length > 0) {
        setGridSize(decodeToNumber(playGameCall[0].calldata[1]));
        setMaxTurn(decodeToNumber(playGameCall[0].calldata[2]));
      }

      setEvents(decodedEvents);
    })();
  }, [transactionHash]);

  const score = 0;

  const gameStateReady = useMemo(() => {
    return !!gridSize && !!maxTurn;
  }, [gridSize, maxTurn]);

  return (
    <GameContext.Provider
      value={{
        gameStateReady,
        gridSize,
        maxTurn,
        score,
        account,
        turnLoading,
        setTurnLoading,
        events,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

interface InternalCall {
  calldata: string[];
  caller_address: string;
  code_address: string;
  events: unknown[];
  internal_calls: InternalCall[];
  selector: string;
}

function findFunctionCallRecursive(
  internalCalls: InternalCall[],
  functionName: string,
  findAll = false
): InternalCall[] {
  const foundFunctions = internalCalls.filter(
    internalCall => getFunctionNameFromKey(internalCall.selector) === functionName
  );

  if (foundFunctions.length > 0 && !findAll) {
    return [foundFunctions[0]];
  }

  const foundRecursiveFunctions = internalCalls.reduce((foundList, internalCall) => {
    if (!internalCall.internal_calls || internalCall.internal_calls.length === 0) {
      return foundList;
    }

    return findFunctionCallRecursive(internalCall.internal_calls, functionName, findAll);
  }, [] as InternalCall[]);

  const finalFunctions = [...foundFunctions, ...foundRecursiveFunctions];

  if (!findAll) {
    return [finalFunctions[0]];
  }

  return finalFunctions;
}
