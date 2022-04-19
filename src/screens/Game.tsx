import { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "react-use";

import Board from "src/components/Board";
import Header from "src/components/Header";
import Loader from "src/components/Loader";
import useGameState from "src/hooks/useGameState";
import useGrid from "src/hooks/useGrid";

const headerHeight = 122;
const gapSize = 16;

export default function Game() {
  const { width: windowWidth, height: windowHeight } = useWindowSize();

  const [currentTurnIndex, setCurrentTurnIndex] = useState(-1);
  const { gameStateReady, gridSize, turnIndex } = useGameState();
  const { dusts, ships, refreshGrid, gridReady } = useGrid();

  useEffect(() => {
    if (gridSize && turnIndex !== undefined && turnIndex > currentTurnIndex) {
      (async function () {
        await refreshGrid();
        setCurrentTurnIndex(turnIndex);
      })();
    }
  }, [currentTurnIndex, turnIndex, refreshGrid, setCurrentTurnIndex]);

  const containerStyle = useMemo(() => {
    const leftPadding = Math.floor(headerHeight / 2);

    return {
      paddingLeft: leftPadding,
      paddingRight: headerHeight - leftPadding,
    };
  }, [headerHeight]);

  const boardSize = useMemo(() => {
    const possibleSize = Math.min(windowHeight - headerHeight, windowWidth);

    return possibleSize - 3 * gapSize;
  }, [windowHeight, windowWidth]);

  const boardStyle = useMemo(() => {
    return {
      height: `${boardSize}px`,
      width: `${boardSize}px`,
      marginBottom: `${gapSize}px`,
    };
  }, [boardSize]);

  const headerStyle = useMemo(() => {
    return {
      marginBottom: `${gapSize}px`,
      marginTop: `${gapSize}px`,
      height: headerHeight,
    };
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-orange-400" style={containerStyle}>
      {renderGame()}
    </div>
  );

  function renderGame() {
    if (gameStateReady && gridReady) {
      return (
        <div>
          <Header style={headerStyle} />
          <Board boardSize={boardSize} style={boardStyle} gridSize={gridSize as number} dusts={dusts} ships={ships} />
        </div>
      );
    }

    return <Loader message={!gameStateReady ? "Loading game state" : "Loading grid"} />;
  }
}
