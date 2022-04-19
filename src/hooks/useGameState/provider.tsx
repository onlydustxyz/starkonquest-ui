import { useStarknet, useStarknetCall, useStarknetInvoke } from "@starknet-react/core";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { uint256ToBN } from "starknet/dist/utils/uint256";

import useDustContract from "../useDustContract";
import useSpaceContract from "../useSpaceContract";
import { context as GameContext, TurnState } from "./context";

interface GameProviderProps {
  children: ReactNode;
}

export default function GameProvider({ children }: GameProviderProps) {
  const { account } = useStarknet();

  const [gameStateReady, setGameStateReady] = useState(false);
  const [turnState, setTurnState] = useState<TurnState>(TurnState.NOT_STARTED);
  const [gameStarted, setGameStarted] = useState(false);

  const [turnLoading, setTurnLoading] = useState(false);

  const { contract: spaceContract } = useSpaceContract();
  const { contract: dustContract } = useDustContract();
  const {
    loading: loadingTurnTransaction,
    error: turnTransactionError,
    invoke,
  } = useStarknetInvoke({ contract: spaceContract, method: "next_turn" });

  const {
    data: turnIndexData,
    loading: turnIndexLoading,
    error: turnIndexError,
  } = useStarknetCall({ contract: spaceContract, method: "get_current_turn", args: [] });

  const {
    data: gridSizeData,
    loading: spceSizeLoading,
    error: gridSizeError,
  } = useStarknetCall({ contract: spaceContract, method: "get_grid_size", args: [] });

  const { data: balanceData, loading } = useStarknetCall({
    contract: dustContract,
    method: "balanceOf",
    args: [account],
  });

  const score = useMemo(() => {
    return balanceData ? uint256ToBN(balanceData[0]).toNumber() / 1000000000000000000 : 0;
  }, [balanceData]);

  const turnIndex = useMemo(() => {
    return turnIndexData ? turnIndexData[0].toNumber() : undefined;
  }, [turnIndexData]);

  const gridSize = useMemo(() => {
    return gridSizeData ? gridSizeData[0].toNumber() : undefined;
  }, [gridSizeData]);

  useEffect(() => {
    if (turnIndex && turnIndex > 0 && gameStarted === false) {
      setGameStarted(true);
    }
  }, [gameStarted, setGameStarted, turnIndex]);

  useEffect(() => {
    if (turnIndexData && gridSize) {
      setGameStateReady(true);
    }
  }, [turnIndexData]);

  useEffect(() => {
    if (loadingTurnTransaction) {
      setTurnState(TurnState.LOADING);
    } else if (turnTransactionError) {
      setTurnState(TurnState.ERROR);
    } else {
      setTurnState(TurnState.DONE);
    }
  }, [loadingTurnTransaction]);

  const nextTurn = useCallback(() => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    setTurnLoading(true);
    invoke({ args: [] });
  }, [gameStarted, invoke]);

  return (
    <GameContext.Provider
      value={{
        gameStateReady,
        turnIndex,
        turnState,
        gridSize,
        gameStarted,
        score,
        account,
        turnLoading,
        setTurnLoading,
        nextTurn,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
