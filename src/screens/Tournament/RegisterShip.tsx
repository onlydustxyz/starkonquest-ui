import { useOutletContext } from "react-router-dom";
import ContentContainer from "src/components/ContentContainer";
import { TournamentData } from "src/hooks/useTournament";

export default function TournamentRegisterShipScreen() {
  const { tournamentData } = useOutletContext<{ tournamentData: TournamentData }>();

  return (
    <div className="max-w-screen-lg xl:mx-auto mx-8 mt-8">
      <div className="flex flex-row justify-end mb-8">
        <div className="flex-grow flex flex-col">
          <span className="text-4xl font-bold">Starkonquest</span>
          <span className="text-3xl ml-8">{tournamentData.tournamentName}</span>
        </div>
      </div>
      <ContentContainer theme="secondary" className="mb-8">
        Tuto comment jouer et participer + lien vers le repo + readme
      </ContentContainer>
      <ContentContainer theme="primary" className="mb-8"></ContentContainer>
    </div>
  );
}
