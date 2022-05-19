import { Link, useOutletContext } from "react-router-dom";
import ContentContainer from "src/components/ContentContainer";
import { TournamentData } from "src/hooks/useTournament";
import { TournamentStage } from "src/hooks/useTournament/library";
import { minimizeAddress } from "src/utils/web3";

export default function TournamentDetailsScreen() {
  const { loadingBattles, tournamentData } = useOutletContext<{
    tournamentData: TournamentData;
    loadingBattles: boolean;
  }>();

  return (
    <div className="max-w-screen-lg lg:mx-auto mx-8 mt-8">
      <div className="mb-8">
        <Link className="flex-grow text-3xl" to={`/tournament/${tournamentData.tournamentAddress}`}>
          <span className="mr-4">&lt;</span>
          {tournamentData.tournamentName}
        </Link>
      </div>
      {renderContent()}
    </div>
  );

  function renderContent() {
    if (tournamentData.stage !== TournamentStage.FINISHED) {
      return (
        <ContentContainer theme="secondary" className="mt-8">
          <div className="text-center text-red-400 text-4xl my-4">This tournament is not finished</div>
        </ContentContainer>
      );
    }

    return (
      <>
        {renderWinner()}
        {renderGames()}
      </>
    );
  }

  function renderWinner() {
    const isWinner = tournamentData.playerShip === tournamentData.tournamentWinner;

    if (isWinner) {
      return (
        <ContentContainer theme="secondary" className="mb-8 py-8 text-center">
          <div className=" text-green-400 text-4xl uppercase">Congrats, you won the tournament</div>
        </ContentContainer>
      );
    }

    return (
      <ContentContainer theme="secondary" className="mb-8 py-8 text-center">
        <div className="text-green-300 text-2xl">
          <div className="mb-4 text-4xl">
            The winner is : {minimizeAddress(tournamentData.tournamentWinner as string)}
          </div>
          <div>Thank you for your participation.</div>
        </div>
      </ContentContainer>
    );
  }

  function renderGames() {
    return (
      <ContentContainer theme="primary" className="mb-8 py-8 text-center">
        <div className="">
          <div className="mb-4 text-blue-400 text-4xl">List of all the battles of the tournament</div>
          {loadingBattles ? (
            <div className="text-blue-200 text-xl pt-4">Battles are loading!</div>
          ) : (
            <ol>{renderBattleList()}</ol>
          )}
        </div>
      </ContentContainer>
    );
  }

  function renderBattleList() {
    return tournamentData.battles.map((battleTransactionHash, index) => {
      return (
        <li key={battleTransactionHash}>
          <Link
            className="text-lg"
            to={`/tournament/${tournamentData.tournamentAddress}/battle/${battleTransactionHash}`}
          >
            Replay Battle n°{index + 1}
          </Link>
        </li>
      );
    });
  }
}
