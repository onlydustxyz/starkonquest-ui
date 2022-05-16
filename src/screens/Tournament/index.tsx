import { Outlet, useParams } from "react-router-dom";
import Loader from "src/components/Loader";
import useTournament, { TournamentData } from "src/hooks/useTournament";

export default function TournamentScreen() {
  const { tournamentAddress } = useParams();
  const { data, loading } = useTournament(tournamentAddress as string);

  if (loading) {
    return <Loader />;
  }

  return <Outlet context={{ tournamentData: data as TournamentData }} />;
}
