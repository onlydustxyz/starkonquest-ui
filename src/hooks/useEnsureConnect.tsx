import { InjectedConnector, useStarknet } from "@starknet-react/core";
import { useCallback, useEffect, useState } from "react";

export default function useEnsureConnect() {
  const { account, connect } = useStarknet();
  const [callback, setCallback] = useState<{ func: (...args: unknown[]) => void; args: unknown[] }>();

  const ensureConnect = useCallback(
    (callback: (...args: unknown[]) => void) => {
      return async function (...args: unknown[]) {
        if (account) {
          return callback(...args);
        }
        setCallback({ func: callback, args });
        await connect(new InjectedConnector());
      };
    },
    [account, connect]
  );

  useEffect(() => {
    if (account && callback) {
      console.log("call callback");
      callback.func(...callback.args);
      setCallback(undefined);
    }
  }, [account, callback]);

  return { ensureConnect };
}
