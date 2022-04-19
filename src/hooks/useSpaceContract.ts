import { useEffect, useState } from "react";
import { Abi, Contract } from "starknet";

import config from "src/config";
import abi from "src/abis/space.json";
import useProvider from "./useProvider";

export default function useSpaceContract() {
  const [contract, setContract] = useState<Contract>();
  const { provider } = useProvider();

  useEffect(() => {
    if (!provider) {
      setContract(undefined);
      return;
    }

    const newContract = new Contract(abi as Abi, config.SPACE_ADDRESS, provider);
    if (newContract) {
      setContract(newContract);
    }
  }, [provider]);

  return { contract };
}
