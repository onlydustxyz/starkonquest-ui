import { useState } from "react";
import { Provider } from "starknet";

import config from "src/config";

export default function useProvider() {
  const [provider] = useState(new Provider({ baseUrl: config.PROVIDER_HOSTNAME }));

  return { provider };
}
