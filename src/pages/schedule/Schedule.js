import React, { useState, useEffect } from "react";
import ScheduleCalendar from "./ScheduleCalendar.js";
import moment from "moment";
import { getBaseUrl } from "../../utils";
import styles from "./Schedule.module.css";
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";
import { useScheduleContext } from "./context/ScheduleContext";
import ScheduleHeader from "./ScheduleHeader.js";
import { Link } from "react-router-dom";
import FabComponent from "./FabComponent.js";
import MeetingDetails from "./MeetingDetails.js";

const Schedule = () => {
    const {
        usersList, setUsersList,
        allEvents, setAllEvents,
        activeMeetingId,setActiveMeetingId,
    } = useScheduleContext();

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    getBaseUrl() + "schedule/get_meetings",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                const data = await response.json();
                if(data.success)
                {
                    // console.log("Hemang" + data.data);
                    // setTempEvents(data.data);
                    console.log(...data.data);
                    const formattedEvents = data.data.map(event => {
                        const tempDate = event.date.split('T');
                        const tempStart = event.startTime.split('T');
                        const tempEnd = event.endTime.split('T');
                        const dateParts = tempDate[0].split('-');
                        const startTimeParts = tempStart[1].split(':');
                        const endTimeParts = tempEnd[1].split(':');
                        // console.log(...dateParts)
                        // console.log(...startTimeParts)
                        // console.log(...endTimeParts)
                        const start = new Date(
                                                dateParts[0],
                                                dateParts[1]-1,
                                                dateParts[2],
                                                startTimeParts[0],
                                                startTimeParts[1]
                                            )
                        // console.log("start"+ start)
                        const end = new Date(
                                                dateParts[0],
                                                dateParts[1]-1,
                                                dateParts[2],
                                                endTimeParts[0],
                                                endTimeParts[1]
                                            )
                        // console.log("end"+ end)
                        // console.log("id" + event._id)
                        return {
                            _id: event._id,
                            title : event.title,
                            start : start,
                            end : end,
                            location : event.location,
                            priority : event.priority,
                            minutesOfMeeting : event.minutesOfMeeting,
                            summary : event.summary
                        };
                    });
                    // console.log('Formatted Events');
                    // console.log(...formattedEvents);
                    // console.log(typeof formattedEvents);
                    setAllEvents(formattedEvents);
                    // console.log(data.data[0]._id);
                    setActiveMeetingId(data.data[0]._id);
                }
                else
                {
                    console.log("Khurana Hemang");
                }
            } catch (error) {
                console.log("Error in fetching meetings", error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    getBaseUrl() + "user/getAllUsers",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                const data = await response.json();
                if(data.success)
                {
                    console.log(data.data);
                    const val = [];
                    data.data.map((item) => {
                        val.push({
                            value: item.id,
                            label: item.first_name + " " + item.last_name,
                        });
                    });
                    setUsersList(val);
                }
                else
                {
                    console.log("Some problem in fetching users");
                }
            } catch (error) {
                console.log("Error in fetching meetings", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.topContainer}>
                <ScheduleHeader />
            </div>
            <div className={styles.bottomContainer}>
                <div className={`${styles.leftContainer} col-sm-8`}>
                    <div className={`${styles.calendarMainContainer} row`}>
                        <div className={styles.calendarDiv}>
                            <ScheduleCalendar events={allEvents} />
                        </div>
                    </div>
                </div>
                <div className={`${styles.rightContainer} col-sm-4`}>
                    <MeetingDetails />
                </div>
            </div>
            <FabComponent />
        </div>
    );
};

export default headerNavbarWrapper(Schedule);
