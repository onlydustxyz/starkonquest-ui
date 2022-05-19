import { useCallback, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { useForm } from "react-hook-form";

import ContentContainer from "src/components/ContentContainer";
import { TournamentData } from "src/hooks/useTournament";
import Button from "src/components/Button";
import useTournamentContract from "src/hooks/useTournamentContract";
import { useStarknet, useStarknetInvoke } from "@starknet-react/core";
import useTransactionReceipt from "src/hooks/useTransactionReceipt";

export default function TournamentRegisterShipScreen() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { tournamentData, refreshTournament } = useOutletContext<{
    tournamentData: TournamentData;
    refreshTournament: () => Promise<void>;
  }>();
  const { account } = useStarknet();
  const [registerTransactionHash, setRegisterTransactionHash] = useState<string | undefined>(
    (window.localStorage.getItem(`t_${account}_${tournamentData.tournamentAddress}_register_hash`) as string) ||
      undefined
  );

  const tournamentContract = useTournamentContract(tournamentData.tournamentAddress);

  const { waiting, data: transactionReceipt } = useTransactionReceipt(registerTransactionHash);

  useEffect(() => {
    if (transactionReceipt) {
      refreshTournament();
    }
  }, [transactionReceipt]);

  const {
    data,
    loading: isSubmitting,
    invoke: invokeRegisterShip,
  } = useStarknetInvoke({ contract: tournamentContract, method: "register" });

  const saveTransactionHash = useCallback((transactionHash: string) => {
    window.localStorage.setItem(`t_${account}_${tournamentData.tournamentAddress}_register_hash`, transactionHash);
    setRegisterTransactionHash(transactionHash);
  }, []);

  const onSubmitRegistration = useCallback(
    async data => {
      await invokeRegisterShip({
        args: [data.shipContractAddress],
      });
    },
    [invokeRegisterShip]
  );

  useEffect(() => {
    if (data) {
      saveTransactionHash(data);
    }
  }, [data]);

  return (
    <div className="max-w-screen-lg xl:mx-auto mx-8 mt-8">
      <div className="flex flex-row items-center justify-end mb-8">
        <Link className="flex-grow text-3xl" to={`/tournament/${tournamentData.tournamentAddress}`}>
          <span className="mr-4">&lt;</span>
          {tournamentData.tournamentName}
        </Link>
        <div className="text-2xl mr-8">
          Registered ships : {tournamentData.shipCount}/{tournamentData.requiredTotalShipCount}
        </div>
      </div>
      {!tournamentData.playerShip && (
        <ContentContainer theme="secondary" className="mb-8">
          Tuto comment jouer et participer + lien vers le repo + readme
        </ContentContainer>
      )}
      {!tournamentData.playerShip && (
        <ContentContainer theme="secondary" className="mb-8">
          Les étapes pour register son ship
        </ContentContainer>
      )}
      {tournamentData.playerShip ? renderAlreadyRegistered() : renderForm()}
    </div>
  );

  function renderAlreadyRegistered() {
    return (
      <ContentContainer theme="primary" className="mb-8">
        <div className="text-center text-red-200 text-4xl">You are registered for the tournament</div>
      </ContentContainer>
    );
  }

  function renderForm() {
    return (
      <ContentContainer theme="primary" className="mb-8">
        <form onSubmit={handleSubmit(onSubmitRegistration)}>
          <div className="flex flex-col">
            {!account && (
              <div className="text-base text-red-700 mb-8">
                You need to connect your wallet in order to register your ship
              </div>
            )}
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
              <Button size="small" type="submit" disabled={!account || isSubmitting}>
                {isSubmitting ? "Submitting" : "Register"}
              </Button>
            </div>
            {errors.shipContractAddress?.type === "required" && (
              <span className="mt-1 text-sm text-red-500">Ship address is missing!</span>
            )}
            {isSubmitting && (
              <div className="mt-10 text-lg text-blue-300 text-center">
                A transaction is being sent to register your ship.
              </div>
            )}
            {waiting && (
              <div className="mt-10 text-lg text-blue-300 text-center">
                The transaction is being processed to register your ship.
              </div>
            )}
          </div>
        </form>
      </ContentContainer>
    );
  }
}
