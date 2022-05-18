import cn from "classnames";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { TournamentData } from "src/hooks/useTournament";
import { TournamentStage } from "src/hooks/useTournament/library";

import Button from "./Button";
import ContentContainer from "./ContentContainer";

export interface TournamentDetailsProps {
  tournamentData: TournamentData;
  className?: string;
}

export default function TournamentDetails({ className, tournamentData }: TournamentDetailsProps) {
  const navigate = useNavigate();

  const RegisterShip = useCallback(() => {
    navigate(`/tournament/${tournamentData.tournamentAddress}/register`);
  }, [tournamentData.tournamentAddress]);

  return (
    <ContentContainer className={cn(className, "text-white flex flex-col")}>
      <div className="flex flex-row items-center justify-end mb-8 h-[72px]">
        <span className="text-3xl fonbt-bold flex-grow">{tournamentData.tournamentName}</span>
        {renderStage()}
      </div>
      <div className="flex flex-row items-center">
        <div className="text-[24px]">
          Number of registered ships : {tournamentData.shipCount}/{tournamentData.requiredTotalShipCount}
        </div>
      </div>
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

  function renderStage() {
    if (tournamentData.stage === TournamentStage.REGISTRATIONS_OPEN && !tournamentData.playerShip) {
      return (
        <Button theme="primary" onClick={RegisterShip}>
          Register ship
        </Button>
      );
    }

    console.log({ ttournamentData: tournamentData });

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
