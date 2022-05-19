import { ReactNode } from "react";
import Game from "src/components/Game";
import { GameProvider } from "src/hooks/useGameState";

export interface BattleTemplateProps {
  battleTransactionHash: string;
  hideHeader?: boolean;
  renderTitle?: () => ReactNode;
  className?: string;
}

export default function BattleTemplate({
  battleTransactionHash,
  className,
  hideHeader = false,
  renderTitle,
}: BattleTemplateProps) {
  return (
    <GameProvider transactionHash={battleTransactionHash}>
      <Game hideHeader={hideHeader} className={className} renderTitle={renderTitle} />
    </GameProvider>
  );
}
