import { useStarknet } from "@starknet-react/core";
import BN from "bn.js";
import { useEffect, useState } from "react";

import useTournamentContract from "src/hooks/useTournamentContract";
import { callContractView, TournamentStage } from "./library";

export interface TournamentData {
  tournamentId: number;
  tournamentName: string;
  tournamentAddress: string;
  rewardTokenAddress: string;
  rewardTotalAmount: BN;
  shipCountPerBattle: number;
  requiredTotalShipCount: number;
  shipCount: number;
  gridSize: number;
  maxDust: number;
  stage: TournamentStage;
  playerShip: string | undefined;
}

export default function useTournament(tournamentAddress: string) {
  const tournamentContract = useTournamentContract(tournamentAddress);
  const { account } = useStarknet();

  const [data, setData] = useState<TournamentData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const [
        tournamentId,
        tournamentName,
        rewardTokenAddress,
        rewardTotalAmount,
        shipCountPerBattle,
        requiredTotalShipCount,
        shipCount,
        gridSize,
        maxDust,
        stage,
        playerShip,
      ] = await Promise.all([
        callContractView(tournamentContract, "tournament_id"),
        callContractView(tournamentContract, "tournament_name"),
        callContractView(tournamentContract, "reward_token_address"),
        callContractView(tournamentContract, "reward_total_amount"),
        callContractView(tournamentContract, "ship_count_per_battle"),
        callContractView(tournamentContract, "required_total_ship_count"),
        callContractView(tournamentContract, "ship_count"),
        callContractView(tournamentContract, "grid_size"),
        callContractView(tournamentContract, "max_dust"),
        callContractView(tournamentContract, "stage"),
        account ? callContractView(tournamentContract, "player_ship", [account]) : Promise.resolve(undefined),
      ]);

      console.log(playerShip);

      setData({
        tournamentId,
        tournamentName,
        tournamentAddress,
        rewardTokenAddress,
        rewardTotalAmount,
        shipCountPerBattle,
        requiredTotalShipCount,
        shipCount,
        gridSize,
        maxDust,
        stage,
        playerShip,
      });
      setLoading(false);
    })();
  }, [tournamentContract]);

  return {
    data,
    loading,
  };
}
