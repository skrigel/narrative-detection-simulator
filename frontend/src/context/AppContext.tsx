import { createContext, useContext, useState, type ReactNode } from "react";

type AppContextType = {
  domain: string;
  setDomain: (value: string) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [domain, setDomain] = useState("general");

  return (
    <AppContext.Provider value={{ domain, setDomain }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};