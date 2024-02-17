import React from "react";
import Leaderboard from "./leaderboard.js";
import LandingPage from "./landing.js";

const AppRoutes = [
  {
    index: true,
    element: <LandingPage />,
  },
  {
    path: "/Leaderboard",
    element: <Leaderboard />,
  },
];

export default AppRoutes;
