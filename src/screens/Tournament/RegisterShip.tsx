import { useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";

import ContentContainer from "src/components/ContentContainer";
import { TournamentData } from "src/hooks/useTournament";
import Button from "src/components/Button";
import useTournamentContract from "src/hooks/useTournamentContract";
import { useStarknet, useStarknetInvoke, useStarknetTransactionManager } from "@starknet-react/core";
import useEnsureConnect from "src/hooks/useEnsureConnect";

export default function TournamentRegisterShipScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { tournamentData } = useOutletContext<{ tournamentData: TournamentData }>();

  const { account } = useStarknet();

  const { ensureConnect } = useEnsureConnect();

  console.log("account =", account);

  const tournamentContract = useTournamentContract(tournamentData.tournamentAddress);

  const {
    data,
    loading,
    error,
    invoke: invokeRegisterShip,
  } = useStarknetInvoke({ contract: tournamentContract, method: "register" });

  const { transactions } = useStarknetTransactionManager();

  const onSubmitRegistration = useCallback(
    ensureConnect(async (data: any) => {
      invokeRegisterShip({ args: [data.shipContractAddress] });
    }),
    [ensureConnect, invokeRegisterShip]
  );

  return (
    <div className="max-w-screen-lg xl:mx-auto mx-8 mt-8">
      <div className="flex flex-row justify-end mb-8">
        <div className="flex-grow flex flex-col">
          <span className="text-4xl font-bold">Starkonquest</span>
          <span className="text-3xl ml-8">{tournamentData.tournamentName}</span>
        </div>
      </div>
      <ContentContainer theme="secondary" className="mb-8">
        Tuto comment jouer et participer + lien vers le repo + readme
      </ContentContainer>
      <ContentContainer theme="secondary" className="mb-8">
        Les étapes pour register son ship
      </ContentContainer>
      <ContentContainer theme="primary" className="mb-8">
        <form onSubmit={handleSubmit(onSubmitRegistration)}>
          <div className="flex flex-col">
            <label className="mb-1" htmlFor="shipContractAddress">
              Ship address
            </label>
            <div className="flex flex-row items-center gap-x-12">
              <div className="flex-grow">
                <input
                  className="w-full"
                  id="shipContractAddress"
                  {...register("shipContractAddress", { required: true })}
                />
              </div>
              <Button size="small" type="submit">
                Register
              </Button>
            </div>
            {errors.shipContractAddress?.type === "required" && (
              <span className="mt-1 text-sm text-red-500">Ship address is missing!</span>
            )}
          </div>
        </form>
      </ContentContainer>
    </div>
  );
}
