import { useMemo } from "react";
import { Abi, Contract } from "starknet";

import config from "src/config";
import abi from "src/abis/battle.json";
import useProvider from "./useProvider";

export default function useSpaceContract() {
  const { provider } = useProvider();

  const contract = useMemo(() => {
    if (!provider) {
      return undefined;
    }

    return new Contract(abi as Abi, config.BATTLE_ADDRESS, provider);
  }, [provider]);

  return { contract };
}