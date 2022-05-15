import Game from "src/components/Game";
import { GameProvider } from "src/hooks/useGameState";

export interface BattleTemplateProps {
  battleTransactionHash: string;
  hideHeader?: boolean;
  className?: string;
}

export default function BattleTemplate({ battleTransactionHash, className, hideHeader = false }: BattleTemplateProps) {
  return (
    <GameProvider transactionHash={battleTransactionHash}>
      <Game hideHeader={hideHeader} className={className} />
    </GameProvider>
  );
}
