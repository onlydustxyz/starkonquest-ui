import { useEffect, useMemo } from "react";
import { useElementSize, useWindowSize } from "usehooks-ts";
import cn from "classnames";

import Board from "src/components/Board";
import Header from "src/components/Header";
import Loader from "src/components/Loader";
import useGameState from "src/hooks/useGameState";
import useGrid from "src/hooks/useGrid";

const BOARD_MIN_SIZE = 260;
export interface GameProps {
  hideHeader?: boolean;
  className?: string;
}

export default function Game({ className, hideHeader = false }: GameProps) {
  const { width: windowWidth } = useWindowSize();

  const [containerRef, { height: containerHeight }] = useElementSize();

  const { gameStateReady, gridSize, events, maxTurn } = useGameState();
  const { dusts, ships, play, pause, resetAndPlay, isPlaying, isGameFinished, currentTurn } = useGrid(events);

  useEffect(() => {
    if (hideHeader) {
      play();
    }
  }, [hideHeader]);

  const boardSize = useMemo(() => {
    return Math.max(Math.min(windowWidth - 32, containerHeight), BOARD_MIN_SIZE);
  }, [containerHeight, windowWidth]);

  if (!gameStateReady) {
    return <Loader message={!gameStateReady ? "Loading game state" : "Loading grid"} />;
  }

  return (
    <div className={cn(className, "h-screen flex flex-col items-center justify-center bg-orange-400")}>
      {!hideHeader && (
        <Header
          className="my-4"
          start={play}
          pause={pause}
          replay={resetAndPlay}
          isPlaying={isPlaying}
          ships={ships}
          isGameFinished={isGameFinished}
          currentTurn={currentTurn}
          maxTurn={maxTurn}
        />
      )}
      <Board
        className="flex-grow mt-4 mb-8 mx-4"
        ref={containerRef}
        boardSize={boardSize}
        gridSize={gridSize as number}
        dusts={dusts}
        ships={ships}
        isGameFinished={isGameFinished}
      />
    </div>
  );
}
