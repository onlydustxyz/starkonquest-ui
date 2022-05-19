import { useStarknet } from "@starknet-react/core";
import BN from "bn.js";
import { useCallback, useEffect, useState } from "react";
import Bluebird from "bluebird";

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
  tournamentWinner: string | undefined;
  battles: string[];
}

export default function useTournament(tournamentAddress: string) {
  const tournamentContract = useTournamentContract(tournamentAddress);
  const { account } = useStarknet();

  const [data, setData] = useState<TournamentData>();
  const [loading, setLoading] = useState(true);
  const [loadingBattles, setLoadingBattles] = useState(false);

  const refresh = useCallback(async () => {
    const [playerShip, shipCount, stage] = await Promise.all([
      account ? callContractView(tournamentContract, "player_ship", [account]) : Promise.resolve(undefined),
      callContractView(tournamentContract, "ship_count"),
      callContractView(tournamentContract, "stage"),
    ]);

    setData(data => {
      if (!data) {
        return undefined;
      }

      return { ...data, playerShip, shipCount, stage };
    });
  }, []);

  const loadBattles = useCallback(async () => {
    if (data?.requiredTotalShipCount && data?.shipCountPerBattle) {
      setLoadingBattles(true);

      // Math.round to fix problem with result like 4.000000000000001
      const nbRounds = Math.round(Math.log(data.requiredTotalShipCount) / Math.log(data.shipCountPerBattle));
      const nbGames = computeNbGames(nbRounds, data.shipCountPerBattle);

      const fetchBattlePromises: number[] = [];

      for (let battleIndex = 0; battleIndex < nbGames; battleIndex++) {
        fetchBattlePromises.push(battleIndex);
      }

      const battles = await Bluebird.map(
        fetchBattlePromises,
        async battleIndex => {
          return callContractView(tournamentContract, "battle_transaction_hash", [battleIndex]);
        },
        { concurrency: 10 }
      );

      setLoadingBattles(true);
      setData(data => {
        if (!data) {
          return undefined;
        }

        return {
          ...data,
          battles,
        };
      });
    }
    setLoadingBattles(false);
  }, [data?.shipCountPerBattle, data?.requiredTotalShipCount, tournamentAddress]);

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
        tournamentWinner,
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
        callContractView(tournamentContract, "tournament_winner"),
      ]);

      if (stage === TournamentStage.FINISHED) {
        loadBattles();
      }

      setData({
        battles: [],
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
        tournamentWinner,
      });
      setLoading(false);
    })();
  }, [loadBattles, tournamentContract]);

  return {
    data,
    loading,
    loadingBattles,
    refresh,
  };

  function computeNbGames(nbRounds: number, nbShipsPerBattle: number) {
    let numberOfGames = 0;

    for (let i = 0; i < nbRounds; i++) {
      numberOfGames += Math.pow(nbShipsPerBattle, i);
    }

    return numberOfGames;
  }
}
