import { useCallback } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { TournamentData } from "src/hooks/useTournament";

import BattleTemplate from "src/templates/Battle";

export default function GameScreen() {
  const { transactionHash } = useParams();
  const { tournamentData } = useOutletContext<{ tournamentData: TournamentData }>();

  const renderTitle = useCallback(() => {
    return (
      <Link className="flex-grow text-3xl" to={`/tournament/${tournamentData.tournamentAddress}/details`}>
        <span className="mr-4">&lt;</span>
        {tournamentData.tournamentName}
      </Link>
    );
  }, [tournamentData.tournamentAddress, tournamentData.tournamentName]);

  return <BattleTemplate battleTransactionHash={transactionHash as string} renderTitle={renderTitle} />;
}
