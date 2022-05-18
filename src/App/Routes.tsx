import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const GameScreen = lazy(() => import("src/screens/Game"));
const TournamentScreen = lazy(() => import("src/screens/Tournament"));
const RegisterShipScreen = lazy(() => import("src/screens/RegisterShip"));

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
        />
        <Route
          path="/tournament/:tournamentAddress/register"
          element={
            <Suspense fallback={<>...</>}>
              <RegisterShipScreen />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
