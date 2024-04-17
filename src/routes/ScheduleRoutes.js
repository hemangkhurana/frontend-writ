import React from "react";
import { Route, Routes } from "react-router-dom";
import { ScheduleContextProvider } from "../pages/schedule/context/ScheduleContext";
// import { SeeMeeting } from "../components/seeMeeting/SeeMeeting";
import { FilterMeeting } from "../pages/schedule/FilterMeeting";
import Schedule from "../pages/schedule/Schedule";
import ManageDepartments from "../pages/schedule/ManageDepartments";

const ScheduleRoutes = () => {
    return (
        <ScheduleContextProvider>
            <Routes>
                <Route path="/" element={<Schedule />}/>
                <Route path="/hemang" element={<FilterMeeting />}/>
                {/* <Route path="/seemeeting/:meetingId" element={<SeeMeeting />}/> */}
                <Route path="/managedepartments" element={<ManageDepartments/>}/>
            </Routes>
        </ScheduleContextProvider>
    )
}

export default ScheduleRoutes;