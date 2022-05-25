import { useCallback } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import Button from "src/components/Button";

import ContentContainer from "src/components/ContentContainer";
import TournamentDetails from "src/components/TournamentDetails";
import { TournamentData } from "src/hooks/useTournament";
import { TournamentStage } from "src/hooks/useTournament/library";
import BattleTemplate from "src/templates/Battle";
import { minimizeAddress } from "src/utils/web3";

export default function TournamentViewScreen() {
  const { tournamentData } = useOutletContext<{ tournamentData: TournamentData }>();
  const navigate = useNavigate();

  const displayHelp = [TournamentStage.CREATED, TournamentStage.REGISTRATIONS_OPEN].includes(tournamentData.stage);

  const goToStarkonquest = useCallback(() => {
    navigate(`/tournament/${tournamentData.tournamentAddress}/register`);
  }, []);

  return (
    <div className="max-w-screen-lg w-full lg:mx-auto mx-8 mt-8">
      <TournamentDetails tournamentData={tournamentData} className="mb-8" />
      {renderHelp()}
      {renderResults()}
    </div>
  );

  function renderHelp() {
    if (!displayHelp) {
      return null;
    }

    return (
      <ContentContainer theme="secondary" className="mb-4">
        <div className="flex flex-row gap-4">
          <div className="flex-grow">
            <div className="font-bold mt-4 mb-8">New to starkonquest?</div>
            <p className="my-6">
              Starkonquest is an AI turn based strategy game in which players can learn and deploy Cairo smart
              contracts.
            </p>
            <p className="mt-6 mb-4">
              If you want to learn more about it and build your own ship to win the reward, click on the button.
            </p>
            <Button theme="secondary" href="https://github.com/onlydustxyz/starkonquest" target="_blank">
              Build your ship
            </Button>
          </div>
          <BattleTemplate battleTransactionHash="0x00" hideHeader={true} className="max-h-[450px] !p-0" />
        </div>
      </ContentContainer>
    );
  }

  function renderResults() {
    if (tournamentData.stage === TournamentStage.FINISHED) {
      const isWinner = tournamentData.playerShip === tournamentData.tournamentWinner;

      if (isWinner) {
        return (
          <ContentContainer theme="secondary" className="text-center">
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

    return null;
  }
}
