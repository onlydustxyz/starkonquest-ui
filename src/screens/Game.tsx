import GameProvider from "src/hooks/useGameState/provider";
import Game from "src/components/Game";
import { useParams } from "react-router-dom";

export default function GameScreen() {
  const { transactionHash } = useParams();
  return (
    <GameProvider transactionHash={transactionHash}>
      <Game />
    </GameProvider>
  );
}
