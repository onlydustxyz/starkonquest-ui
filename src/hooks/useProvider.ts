import { useState } from "react";
import { Provider } from "starknet";

export default function useProvider() {
  const [provider] = useState(new Provider({ baseUrl: "http://localhost:5000" }));

  return { provider };
}
