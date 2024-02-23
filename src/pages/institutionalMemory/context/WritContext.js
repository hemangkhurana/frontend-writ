import { createContext, useContext, useEffect, useState } from "react";
import { useWritState } from "./WritState";

const WritContext = createContext();

export const WritProvider = ({ children }) => {
    
    const state = {
        ...useWritState(),
    };

    return (
        <WritContext.Provider value={state}>{children}</WritContext.Provider>
    );
};

export const useWrit = () => {
    return useContext(WritContext);
};
