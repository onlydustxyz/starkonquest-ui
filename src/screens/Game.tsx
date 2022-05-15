import { useParams } from "react-router-dom";

import BattleTemplate from "src/templates/Battle";

export default function GameScreen() {
  const { transactionHash } = useParams();

  return <BattleTemplate battleTransactionHash={transactionHash as string} />;
}
