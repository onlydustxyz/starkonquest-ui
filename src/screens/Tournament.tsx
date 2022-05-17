import { useParams } from "react-router-dom";
import Button from "src/components/Button";
import ContentContainer from "src/components/ContentContainer";
import Loader from "src/components/Loader";
import TournamentDetails from "src/components/TournamentDetails";
import useTournament, { TournamentData } from "src/hooks/useTournament";
import BattleTemplate from "src/templates/Battle";

export default function Test() {
  const { tournamentAddress } = useParams();
  const { data, loading } = useTournament(tournamentAddress as string);

  if (loading) {
    return <Loader />;
  }

  const tournamentData = data as TournamentData;

  return (
    <div className="max-w-screen-lg xl:mx-auto mx-8 mt-8">
      <div className="flex flex-row justify-end mb-8">
        <div className="flex-grow flex flex-col">
          <span className="text-4xl font-bold">Starkonquest</span>
          <span className="text-3xl ml-8">{tournamentData.tournamentName}</span>
        </div>
        <Button theme="primary">Register ship</Button>
      </div>

      <ContentContainer theme="secondary" className="mb-8">
        Phrase d'intro sur starkonquest et le fait que c'est open source + lien vers "l'univers onlydust"
      </ContentContainer>

      <TournamentDetails tournamentData={tournamentData} className="mb-8" />

      <ContentContainer theme="secondary" className="mb-8">
        Tuto comment jouer et participer + lien vers le repo + readme
      </ContentContainer>

      <BattleTemplate battleTransactionHash="0x00" hideHeader={true} className="max-h-[450px]" />
    </div>
  );
}