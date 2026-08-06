import { createContext, useMemo, useState, type ReactNode } from "react";

type NavContextType = {
    active: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
};

export const NavContext = createContext<NavContextType | undefined>(undefined);

type NavProviderProps = {
    children: ReactNode;
};

export const NavProvider = ({ children }: NavProviderProps) => {
    const [active, setActive] = useState<string>("Home");

    const value = useMemo(() => ({ active, setActive }), [active]);

    return (
        <NavContext.Provider value={value}>
            {children}
        </NavContext.Provider>
    );
};