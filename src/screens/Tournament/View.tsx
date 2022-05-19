import { Link, useOutletContext } from "react-router-dom";

import ContentContainer from "src/components/ContentContainer";
import TournamentDetails from "src/components/TournamentDetails";
import { TournamentData } from "src/hooks/useTournament";
import { TournamentStage } from "src/hooks/useTournament/library";
import BattleTemplate from "src/templates/Battle";
import { minimizeAddress } from "src/utils/web3";

export default function TournamentViewScreen() {
  const { tournamentData } = useOutletContext<{ tournamentData: TournamentData }>();

  const displayHelp = [TournamentStage.CREATED, TournamentStage.REGISTRATIONS_OPEN].includes(tournamentData.stage);

  return (
    <div className="max-w-screen-lg lg:mx-auto mx-8 mt-8">
      <ContentContainer theme="secondary" className="mb-8">
        Phrase d'intro sur starkonquest et le fait que c'est open source + lien vers "l'univers onlydust"
      </ContentContainer>
      <TournamentDetails tournamentData={tournamentData} className="mb-8" />
      {displayHelp && (
        <ContentContainer theme="secondary" className="mb-8">
          Tuto comment jouer et participer + lien vers le repo + readme
        </ContentContainer>
      )}
      {renderDemoOrResults()}
    </div>
  );

  function renderDemoOrResults() {
    if (tournamentData.stage === TournamentStage.FINISHED) {
      const isWinner = tournamentData.playerShip === tournamentData.tournamentWinner;

      if (isWinner) {
        return (
          <ContentContainer theme="secondary" className="mb-8 py-8 text-center">
            <div className=" text-green-400 text-4xl mb-8 uppercase">You won the tournament</div>
            <Link
              to={`/tournament/${tournamentData.tournamentAddress}/details`}
              className="text-blue-200 text-xl underline"
            >
              See tournament details & games
            </Link>
          </ContentContainer>
        );
      }

      return (
        <ContentContainer theme="secondary" className="mb-8 py-8 text-center">
          <div className=" text-green-300 text-4xl">Results are available</div>
          {tournamentData.tournamentWinner && (
            <div className="mt-6 text-green-300 text-2xl">
              Winner : {minimizeAddress(tournamentData.tournamentWinner)}
            </div>
          )}
          <Link
            to={`/tournament/${tournamentData.tournamentAddress}/details`}
            className="text-center text-blue-200 text-xl underline"
          >
            See tournament details & games
          </Link>
        </ContentContainer>
      );
    }

    if (tournamentData.stage === TournamentStage.STARTED) {
      return (
        <ContentContainer theme="secondary" className="mb-8 py-8">
          <div className="text-center text-blue-200 text-4xl">Tournament is currently being processed</div>
        </ContentContainer>
      );
    }

    return <BattleTemplate battleTransactionHash="0x00" hideHeader={true} className="max-h-[450px] !p-0" />;
  }
}
