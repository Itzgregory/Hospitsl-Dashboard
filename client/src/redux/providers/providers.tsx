"use client"; 
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store"; 

interface ProvidersProps {
    children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};