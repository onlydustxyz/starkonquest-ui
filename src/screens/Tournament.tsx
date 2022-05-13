import { useParams } from "react-router-dom";

import ContentContainer from "src/components/ContentContainer";
import Loader from "src/components/Loader";
import useTournament from "src/hooks/useTournament";
import { minimizeAddress } from "src/utils/web3";

export default function Test() {
  const { tournamentAddress } = useParams();
  const { data, loading } = useTournament(tournamentAddress as string);

  if (loading) {
    return <Loader />;
  }

  return (
    <ContentContainer className="max-w-2xl mx-auto mt-8 text-white flex flex-col px-8 py-4">
      <div className="flex flex-row items-center">
        <div className="flex-grow flex flex-row items-center">
          <div className="flex flex-col">
            <span className="text-[32px] leading-[28px] mr-2">{data?.tournamentName}</span>
            <span className="text-gray-300">({minimizeAddress(tournamentAddress as string)})</span>
          </div>
        </div>
        <div className="text-[24px]">
          {data?.shipCount}/{data?.requiredTotalShipCount}
        </div>
      </div>
      <div className="flex-grow mt-8">
        <div className="font-bold text-xl">Games details</div>
        <ul>
          <li>Grid size : {data?.gridSize}</li>
          <li>Maximum Dust : {data?.maxDust}</li>
          <li>Ship per battle : {data?.shipCountPerBattle}</li>
        </ul>
      </div>
      <div className="self-end">Reward {data?.rewardTotalAmount?.toString()}</div>
    </ContentContainer>
  );
}
