import { useMemo } from "react";
import { Abi, Contract } from "starknet";

import abi from "src/abis/tournament.json";
import { useStarknet } from "@starknet-react/core";

export default function useTournamentContract(tournamentContractAddress: string) {
  const { library } = useStarknet();

  const contract = useMemo(() => {
    return new Contract(abi as Abi, tournamentContractAddress, library);
  }, [library, tournamentContractAddress]);

  return contract;
}
