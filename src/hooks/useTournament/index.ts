import BN from "bn.js";
import { useEffect, useState } from "react";

import useTournamentContract from "src/hooks/useTournamentContract";
import { callContractView } from "./library";

export interface TournamentData {
  tournamentId: number;
  tournamentName: string;
  rewardTokenAddress: string;
  rewardTotalAmount: BN;
  shipCountPerBattle: number;
  requiredTotalShipCount: number;
  shipCount: number;
  gridSize: number;
  maxDust: number;
}

export default function useTournament(tournamentHash: string) {
  const tournamentContract = useTournamentContract(tournamentHash);

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
      ]);

      setData({
        tournamentId,
        tournamentName,
        rewardTokenAddress,
        rewardTotalAmount,
        shipCountPerBattle,
        requiredTotalShipCount,
        shipCount,
        gridSize,
        maxDust,
      });
      setLoading(false);
    })();
  }, [tournamentContract]);

  return {
    data,
    loading,
  };
}
