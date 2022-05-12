import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

import BN from "bn.js";

import useTournament from "./index";
import { callContractView, ContractViewName } from "./library";

const MOCK_TOURNAMENT_ADDRESS = "0x0000000000000000000000000000000000000000000000000000000000000000";

vi.mock("./library", () => {
  return {
    callContractView: vi.fn(),
  };
});

describe("useTournament", () => {
  const mockedViews = {
    tournament_id: 1,
    tournament_name: "test_tournament_name",
    reward_token_address: "0x0000",
    reward_total_amount: new BN(1254),
    ship_count_per_battle: 2,
    required_total_ship_count: 32,
    ship_count: 25,
    grid_size: 100,
    max_dust: 10,
  } as Record<ContractViewName, unknown>;

  beforeEach(async () => {
    (callContractView as ReturnType<typeof vi.fn>).mockClear();
    (callContractView as ReturnType<typeof vi.fn>).mockImplementation((_, viewName: ContractViewName) => {
      return mockedViews[viewName] || undefined;
    });
  });

  it("should works successfully", async () => {
    const { result, waitForNextUpdate } = renderHook(({ tournamentAddress }) => useTournament(tournamentAddress), {
      initialProps: {
        tournamentAddress: MOCK_TOURNAMENT_ADDRESS,
      },
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBe(true);
    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data?.tournamentId).toBe(mockedViews.tournament_id);
    expect(result.current.data?.tournamentName).toBe(mockedViews.tournament_name);
    expect(result.current.data?.rewardTokenAddress).toBe(mockedViews.reward_token_address);
    expect(result.current.data?.rewardTotalAmount).toBe(mockedViews.reward_total_amount);
    expect(result.current.data?.shipCountPerBattle).toBe(mockedViews.ship_count_per_battle);
    expect(result.current.data?.requiredTotalShipCount).toBe(mockedViews.required_total_ship_count);
    expect(result.current.data?.shipCount).toBe(mockedViews.ship_count);
    expect(result.current.data?.gridSize).toBe(mockedViews.grid_size);
    expect(result.current.data?.maxDust).toBe(mockedViews.max_dust);
  });
});
