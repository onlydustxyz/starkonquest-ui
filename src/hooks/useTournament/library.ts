import { Contract } from "starknet";
import { decodeShortString } from "starknet/dist/utils/shortString";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { addHexPrefix } from "starknet/dist/utils/encode";
import { toBN } from "starknet/dist/utils/number";

import { decodeToNumber } from "src/utils/felt";

const contractViewFormatter = {
  tournament_id: formatNumber,
  tournament_name: formatString,
  reward_token_address: formatAddress,
  reward_total_amount: formatUint256,
  ship_count_per_battle: formatNumber,
  required_total_ship_count: formatNumber,
  ship_count: formatNumber,
  grid_size: formatNumber,
  max_dust: formatNumber,
  stage: formatStage,
  player_ship: formatOptionalAddress,
  tournament_winner: formatOptionalAddress,
  battle_transaction_hash: formatAddress,
};

export enum TournamentStage {
  CREATED = 1,
  REGISTRATIONS_OPEN = 2,
  REGISTRATIONS_CLOSED = 3,
  STARTED = 4,
  FINISHED = 5,
}

export type ContractViewName = keyof typeof contractViewFormatter;

type ReturnTypeFormatter<T extends ContractViewName> = ReturnType<typeof contractViewFormatter[T]>;

export async function callContractView<T extends ContractViewName>(
  contract: Contract,
  viewName: T,
  args: unknown[] = []
): Promise<ReturnTypeFormatter<T>> {
  const result = await contract.call(viewName, args);

  return contractViewFormatter[viewName](result) as ReturnTypeFormatter<T>;
}

function formatNumber(result: Unpromise<ReturnType<Contract["call"]>>) {
  return decodeToNumber(result[0]);
}

function formatString(result: Unpromise<ReturnType<Contract["call"]>>) {
  return decodeShortString(toBN(result[0]).toString(16));
}

function formatUint256(result: Unpromise<ReturnType<Contract["call"]>>) {
  return uint256ToBN(result[0]);
}

function formatAddress(result: Unpromise<ReturnType<Contract["call"]>>) {
  return addHexPrefix(result[0].toString(16));
}

function formatStage(result: Unpromise<ReturnType<Contract["call"]>>) {
  return formatNumber(result) as TournamentStage;
}

function formatOptionalAddress(result: Unpromise<ReturnType<Contract["call"]>>) {
  const shipAddress = formatAddress(result);

  if (shipAddress === "0x0") {
    return undefined;
  }

  return shipAddress;
}
