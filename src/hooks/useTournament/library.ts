import { Contract } from "starknet";
import { decodeShortString } from "starknet/dist/utils/shortString";

import { decodeToNumber } from "src/utils/felt";

const contractViewFormatter = {
  tournament_id: formatNumber,
  tournament_name: formatString,
  reward_token_address: formatString,
  reward_total_amount: formatNumber,
  ship_count_per_battle: formatNumber,
  required_total_ship_count: formatNumber,
  grid_size: formatNumber,
  max_dust: formatNumber,
};

type ReturnTypeFormatter<T extends keyof typeof contractViewFormatter> = ReturnType<typeof contractViewFormatter[T]>;

export async function callContractView<T extends keyof typeof contractViewFormatter>(
  contract: Contract,
  viewName: T
): Promise<ReturnTypeFormatter<T>> {
  const result = await contract.call(viewName);

  return contractViewFormatter[viewName](result) as ReturnTypeFormatter<T>;
}

function formatNumber(result: Unpromise<ReturnType<Contract["call"]>>) {
  return decodeToNumber(result[0]);
}

function formatString(result: Unpromise<ReturnType<Contract["call"]>>) {
  return decodeShortString(result[0]);
}
