import { useState } from "react";
import { Provider } from "starknet";

export default function useProvider() {
  const [provider] = useState(new Provider({ baseUrl: "https://alpha4.starknet.io" }));

  return { provider };
}
