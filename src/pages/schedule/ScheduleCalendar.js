import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, Button, TextField } from "@mui/material";
import { useScheduleContext } from "./context/ScheduleContext";
import CreateMeeting from "./CreateMeeting";
import { getBaseUrl } from "../../utils";

const localizer = momentLocalizer(moment);

const EventComponent = ({ event }) => {
    const { activeMeetingId, setActiveMeetingId } = useScheduleContext();
    return (
        <div onClick={() => setActiveMeetingId(event._id)}>{event.title}</div>
    );
};

const MyCalendar = () => {
    const {
        allEvents, setAllEvents,
    } = useScheduleContext();


    useEffect(() => {
        // Your code to handle rerendering of MyCalendar component
    }, [allEvents]);


    return (
        <div>
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                components={{
                    event: EventComponent,
                }}
            />
            
        </div>
    );
};

export default MyCalendar;
