import GameProvider from "src/hooks/useGameState/provider";
import Game from "src/components/Game";

export default function GameScreen() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
