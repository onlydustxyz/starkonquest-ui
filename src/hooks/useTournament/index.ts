import { useEffect, useState } from "react";

import useTournamentContract from "src/hooks/useTournamentContract";
import { callContractView } from "./library";

export default function useTournament(tournamentHash: string) {
  const tournamentContract = useTournamentContract(tournamentHash);

  const [tournamentId, setTournamentId] = useState<number>();
  const [tournamentName, setTournamentName] = useState<string>();
  const [rewardTokenAddress, setRewardTokenAddress] = useState<string>();
  const [rewardTotalAmount, setRewardTotalAmount] = useState<number>();
  const [shipCountPerBattle, setShipCountPerBattle] = useState<number>();
  const [requiredTotalShipCount, setRequiredTotalShipCount] = useState<number>();
  const [gridSize, setGridSize] = useState<number>();
  const [maxDust, setMaxDust] = useState<number>();

  useEffect(() => {
    (async function () {
      const [
        fetchedTournamentId,
        fetchedTournamentName,
        fetchedRewardTokenAddress,
        fetchedRewardTotalAmount,
        fetchedShipCountPerBattle,
        fetchedRequiredTotalShipCount,
        fetchedGridSize,
        fetchedMaxDust,
      ] = await Promise.all([
        callContractView(tournamentContract, "tournament_id"),
        callContractView(tournamentContract, "tournament_name"),
        callContractView(tournamentContract, "reward_token_address"),
        callContractView(tournamentContract, "reward_total_amount"),
        callContractView(tournamentContract, "ship_count_per_battle"),
        callContractView(tournamentContract, "required_total_ship_count"),
        callContractView(tournamentContract, "grid_size"),
        callContractView(tournamentContract, "max_dust"),
      ]);

      setTournamentId(fetchedTournamentId);
      setTournamentName(fetchedTournamentName);
      setRewardTokenAddress(fetchedRewardTokenAddress);
      setRewardTotalAmount(fetchedRewardTotalAmount);
      setShipCountPerBattle(fetchedShipCountPerBattle);
      setRequiredTotalShipCount(fetchedRequiredTotalShipCount);
      setGridSize(fetchedGridSize);
      setMaxDust(fetchedMaxDust);
    })();
  }, [
    tournamentContract,
    tournamentName,
    rewardTokenAddress,
    rewardTotalAmount,
    shipCountPerBattle,
    requiredTotalShipCount,
    gridSize,
    maxDust,
  ]);

  return tournamentId;
}
