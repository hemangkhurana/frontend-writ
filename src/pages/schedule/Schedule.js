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
        fetchMeetings,
    } = useScheduleContext();

    

    useEffect(() => {
        fetchMeetings();
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
