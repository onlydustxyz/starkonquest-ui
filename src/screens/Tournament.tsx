import { useParams } from "react-router-dom";
import useTournament from "src/hooks/useTournament";

export default function Test() {
  const { tournamentAddress } = useParams();
  const { data, loading } = useTournament(tournamentAddress as string);

  return (
    <div className="text-white">
      <pre>{loading ? "Loading..." : JSON.stringify(data, null, 2)}</pre>
      <div>Reward amount : {!loading && data?.rewardTotalAmount?.toString()}</div>
    </div>
  );
}
