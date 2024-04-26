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
    const { activeMeetingIndex, setActiveMeetingIndex } = useScheduleContext();
    return (
        <div onClick={() => setActiveMeetingIndex(event.id)}>{event.title}</div>
    );
};

const MyCalendar = () => {
    const {
        newEvent,
        setNewEvent,
        allEvents,
        setAllEvents,
        modalOpen,
        setModalOpen,
        selectedMeeting,
        setSelectedMeeting,
        activeMeetingIndex,
        setActiveMeetingIndex,
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
