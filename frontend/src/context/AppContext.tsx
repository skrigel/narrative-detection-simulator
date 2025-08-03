import { createContext, useState, type ReactNode } from "react";

type AppContextType = {
  domain: string;
  setDomain: (value: string) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [domain, setDomain] = useState("general");

  return (
    <AppContext.Provider value={{ domain, setDomain }}>
      {children}
    </AppContext.Provider>
  );
};

