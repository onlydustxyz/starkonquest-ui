import { useStarknet } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { TransactionReceipt } from "starknet";
import { BigNumberish } from "starknet/dist/utils/number";

export default function useTransactionReceipt(transactionHash: BigNumberish | undefined) {
  const [waiting, setWaiting] = useState(!!transactionHash);
  const { library } = useStarknet();

  const [data, setData] = useState<TransactionReceipt>();

  useEffect(() => {
    if (!transactionHash) {
      setWaiting(false);
      setData(undefined);
      return;
    }

    (async function () {
      setWaiting(true);
      try {
        await library.waitForTransaction(transactionHash, 2000);
      } catch (err) {
        setWaiting(false);
        setData(undefined);
      }

      const fetchedTransactionReceipt = await library.getTransactionReceipt({ txHash: transactionHash });

      setData(fetchedTransactionReceipt);
      setWaiting(false);
    })();
  }, [transactionHash]);

  return { waiting, data };
}
