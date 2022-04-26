import { useStarknet } from "@starknet-react/core";
import { ReactNode, useEffect, useState } from "react";
import { decodeEvent, getFunctionNameFromKey, TransactionReceipt } from "src/helpers/abis";
import { decodeToNumber } from "src/utils/felt";

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
  const [gameStateReady, setGameStateReady] = useState(false);

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
        fetch(
          `https://hackathon-0.starknet.io/feeder_gateway/get_transaction_receipt?transactionHash=${transactionHash}`
        ),
        fetch(
          `https://hackathon-0.starknet.io/feeder_gateway/get_transaction_trace?transactionHash=${transactionHash}`
        ),
      ]);

      const jsonReceipt: TransactionReceipt = await transactionReceiptResponse.json();
      const jsonTrace: any = await transactionTraceResponse.json();

      const decodedEvents = jsonReceipt.events.map(decodeEvent).filter(a => !!a) as GameEvent[];

      if (getFunctionNameFromKey(jsonTrace.function_invocation.internal_calls[0].selector) === "play_game") {
        const call = jsonTrace.function_invocation.internal_calls[0];
        setGridSize(decodeToNumber(call.calldata[1]));
        setMaxTurn(decodeToNumber(call.calldata[2]));
      }

      setEvents(decodedEvents);
    })();
  }, [transactionHash]);

  const score = 0;

  useEffect(() => {
    if (gridSize && maxTurn) {
      setGameStateReady(true);
    }
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
