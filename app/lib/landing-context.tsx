"use client";

import { createContext, useContext } from "react";

export const LandingStartedContext = createContext(false);

export function useLandingStarted() {
  return useContext(LandingStartedContext);
}
