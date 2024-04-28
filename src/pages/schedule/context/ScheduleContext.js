import { createContext, useContext, useEffect, useState } from "react";
import { useScheduleState } from "./ScheduleState";
import { useMeetingDetailsState } from "./MeetingDetailsState";

const ScheduleContext = createContext();

export const ScheduleContextProvider = ({ children }) => {
    
    const state = {
        ...useScheduleState(),
        ...useMeetingDetailsState(),
    };

    return (
        <ScheduleContext.Provider value={state}>{children}</ScheduleContext.Provider>
    );
};

export const useScheduleContext = () => {
    return useContext(ScheduleContext);
};
