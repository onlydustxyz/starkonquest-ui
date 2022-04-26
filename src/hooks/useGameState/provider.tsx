import { useStarknet } from "@starknet-react/core";
import { ReactNode, useEffect, useState } from "react";
import { decodeEvent, TransactionReceipt } from "src/helpers/abis";

import useSpaceContract from "../useSpaceContract";
import { context as GameContext } from "./context";
import { GameEvent, testEvents } from "./types";

interface GameProviderProps {
  children: ReactNode;
}

export default function GameProvider({ children }: GameProviderProps) {
  const { account } = useStarknet();

  const [gridSize, setGridSize] = useState<number>();
  const [gameStateReady, setGameStateReady] = useState(false);

  const [events, setEvents] = useState<GameEvent[]>(testEvents);

  const [turnLoading, setTurnLoading] = useState(false);

  useEffect(() => {
    const transactionHash = "0x53798571ea52834c6334de8c10b411452ae62d56f88042e1df4fb4d7e70d86c";

    (async function () {
      const response = await fetch(
        `https://hackathon-0.starknet.io/feeder_gateway/get_transaction_receipt?transactionHash=${transactionHash}`
      );

      const jsonResponse: TransactionReceipt = await response.json();

      const decodedEvents = jsonResponse.events.map(decodeEvent).filter(a => !!a) as GameEvent[];

      setEvents(decodedEvents);
    })();
  }, []);

  // const { contract: spaceContract } = useSpaceContract();

  // useEffect(() => {
  //   (async function () {
  //     if (!spaceContract) {
  //       return;
  //     }

  //     const res = await spaceContract.call("get_grid_size");

  //     setGridSize(res[0].toNumber());
  //   })();
  // }, [spaceContract]);

  useEffect(() => {
    setGridSize(20);
  }, []);

  const score = 0;

  useEffect(() => {
    if (gridSize) {
      setGameStateReady(true);
    }
  }, [gridSize]);

  return (
    <GameContext.Provider
      value={{
        gameStateReady,
        gridSize,
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
