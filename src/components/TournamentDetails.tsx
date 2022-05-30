import cn from "classnames";

import { TournamentData } from "src/hooks/useTournament";
import { TournamentStage } from "src/hooks/useTournament/library";

import Button from "./Button";
import ContentContainer from "./ContentContainer";

export interface TournamentDetailsProps {
  tournamentData: TournamentData;
  className?: string;
}

export default function TournamentDetails({ className, tournamentData }: TournamentDetailsProps) {
  return (
    <ContentContainer className={cn(className, "text-white flex flex-col")}>
      <div className="flex flex-row items-center justify-end mb-8 h-[72px]">
        <span className="text-3xl fonbt-bold flex-grow">{tournamentData.tournamentName}</span>
        {renderStage()}
      </div>
      <div className="flex flex-row items-center">
        <div className="text-[22px] font-bold">Current number of ships: {tournamentData.shipCount}</div>
      </div>
      <div className="flex-grow mt-8">
        <div className="font-bold text-xl mb-2">Games details</div>
        <p>During a tournament, all games follow the same rules and are repeated until only one ship remains.</p>
        <span>For this tournament, games rules are as follow:</span>
        <ul className="mt-4">
          <li>Grid size : {tournamentData.gridSize}</li>
          <li>Maximum Dust : {tournamentData.maxDust}</li>
          <li>Ship per battle : {tournamentData.shipCountPerBattle}</li>
        </ul>
      </div>
      <div className="self-end">Reward {tournamentData.rewardTotalAmount?.toString()}</div>
    </ContentContainer>
  );

  function renderStage() {
    if (tournamentData.stage === TournamentStage.REGISTRATIONS_OPEN && !tournamentData.playerShip) {
      return (
        <Button theme="primary" href={`/tournament/${tournamentData.tournamentAddress}/register`}>
          Register ship
        </Button>
      );
    }

    return (
      <div className="flex flex-col">
        <div className="font-bold text-2xl">{getStageLabel(tournamentData.stage)}</div>
        {tournamentData.playerShip && <div className="text-sm">Already registered</div>}
      </div>
    );
  }
}

function getStageLabel(stage: TournamentData["stage"]) {
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
