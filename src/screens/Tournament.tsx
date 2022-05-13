import { useParams } from "react-router-dom";

import ContentContainer from "src/components/ContentContainer";
import Loader from "src/components/Loader";
import useTournament, { TournamentData } from "src/hooks/useTournament";
import { TournamentStage } from "src/hooks/useTournament/library";
import { minimizeAddress } from "src/utils/web3";

export default function Test() {
  const { tournamentAddress } = useParams();
  const { data, loading } = useTournament(tournamentAddress as string);

  if (loading) {
    return <Loader />;
  }

  return (
    <ContentContainer className="max-w-2xl mx-auto mt-8 text-white flex flex-col px-8 py-4">
      <div className="flex flex-row items-center">
        <div className="flex-grow flex flex-row items-center">
          <div className="flex flex-col">
            <span className="text-[32px] leading-[28px] mr-2">{data?.tournamentName}</span>
            <span className="text-gray-300">({minimizeAddress(tournamentAddress as string)})</span>
          </div>
        </div>
        <div className="text-[24px]">
          {data?.shipCount}/{data?.requiredTotalShipCount}
        </div>
      </div>
      <div className="mt-2 text-lg font-bold">{renderStage((data as TournamentData).stage)}</div>
      <div className="flex-grow mt-8">
        <div className="font-bold text-xl">Games details</div>
        <ul>
          <li>Grid size : {data?.gridSize}</li>
          <li>Maximum Dust : {data?.maxDust}</li>
          <li>Ship per battle : {data?.shipCountPerBattle}</li>
        </ul>
      </div>
      <div className="self-end">Reward {data?.rewardTotalAmount?.toString()}</div>
    </ContentContainer>
  );
}

function renderStage(stage: TournamentData["stage"]) {
  switch (stage) {
    case TournamentStage.CREATED:
      return "Created";
    case TournamentStage.REGISTRATIONS_OPEN:
      return "Registration opened";
    case TournamentStage.REGISTRATIONS_CLOSED:
      return "Registrations closed";
    case TournamentStage.STARTED:
      return "Started";
    case TournamentStage.FINISHED:
      return "Finished";
  }
}
