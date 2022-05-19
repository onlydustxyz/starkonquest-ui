import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const GameScreen = lazy(() => import("src/screens/Game"));
const TournamentScreen = lazy(() => import("src/screens/Tournament/index"));
const TournamentRegisterShipScreen = lazy(() => import("src/screens/Tournament/RegisterShip"));
const TournamentViewScreen = lazy(() => import("src/screens/Tournament/View"));
const TournamentDetailsScreen = lazy(() => import("src/screens/Tournament/Details"));

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/game/:transactionHash"
          element={
            <Suspense fallback={<>...</>}>
              <GameScreen />
            </Suspense>
          }
        />
        <Route
          path="/tournament/:tournamentAddress"
          element={
            <Suspense fallback={<>...</>}>
              <TournamentScreen />
            </Suspense>
          }
        >
          <Route
            path="/tournament/:tournamentAddress"
            element={
              <Suspense fallback={<>...</>}>
                <TournamentViewScreen />
              </Suspense>
            }
          />
          <Route
            path="/tournament/:tournamentAddress/register"
            element={
              <Suspense fallback={<>...</>}>
                <TournamentRegisterShipScreen />
              </Suspense>
            }
          />
          <Route
            path="/tournament/:tournamentAddress/details"
            element={
              <Suspense fallback={<>...</>}>
                <TournamentDetailsScreen />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
