import { createContext, useContext } from "react";
import type { InitResponse } from "@/entities/init/model/types";

const InitDataContext = createContext<InitResponse | null>(null);

export const useInitData = () => {
  const context = useContext(InitDataContext);
  if (!context) {
    throw new Error("useInitData must be used within InitDataProvider");
  }
  return context;
};

export { InitDataContext };
