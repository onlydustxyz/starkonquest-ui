import { useMemo } from "react";
import { Abi, Contract } from "starknet";

import abi from "src/abis/battle.json";
import useProvider from "./useProvider";

export default function useTournamentContract(tournamentContractAddress: string) {
  const { provider } = useProvider();

  const contract = useMemo(() => {
    return new Contract(abi as Abi, tournamentContractAddress, provider);
  }, [provider, tournamentContractAddress]);

  return contract;
}
