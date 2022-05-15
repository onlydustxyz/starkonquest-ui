import cn from "classnames";

import { TournamentData } from "src/hooks/useTournament";
import { TournamentStage } from "src/hooks/useTournament/library";
import { minimizeAddress } from "src/utils/web3";

import ContentContainer from "./ContentContainer";

export interface TournamentDetailsProps {
  tournamentData: TournamentData;
  className?: string;
}

export default function TournamentDetails({ className, tournamentData }: TournamentDetailsProps) {
  return (
    <ContentContainer className={cn(className, "text-white flex flex-col")}>
      <div className="flex flex-row items-center">
        <div className="flex-grow flex flex-row items-center">
          <div className="flex flex-col">
            <span className="text-[32px] leading-[28px] mr-2">{tournamentData.tournamentName}</span>
            <span className="text-gray-300">({minimizeAddress(tournamentData.tournamentAddress as string)})</span>
          </div>
        </div>
        <div className="text-[24px]">
          {tournamentData.shipCount}/{tournamentData.requiredTotalShipCount}
        </div>
      </div>
      <div className="mt-2 text-lg font-bold">{renderStage((tournamentData as TournamentData).stage)}</div>
      <div className="flex-grow mt-8">
        <div className="font-bold text-xl">Games details</div>
        <ul>
          <li>Grid size : {tournamentData.gridSize}</li>
          <li>Maximum Dust : {tournamentData.maxDust}</li>
          <li>Ship per battle : {tournamentData.shipCountPerBattle}</li>
        </ul>
      </div>
      <div className="self-end">Reward {tournamentData.rewardTotalAmount?.toString()}</div>
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
