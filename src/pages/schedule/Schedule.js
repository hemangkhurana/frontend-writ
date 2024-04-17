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
    const [newEvent, setNewEvent] = useState(0);
    const [scheduleFirst, setScheduleFirst] = useState(1);
    const [scheduledTime, setTime] = useState(
        moment("10:00", "hh:mm").format("hh:mm")
    );
    const [total_pages, setTotal] = useState(0);
    const [past_total_pages, setPastTotal] = useState(0);
    const [page, setPage] = React.useState(1);
    const [loading, setLoading] = useState(1);

    const {
        meetingGroups,
        setMeetingGroups,
        actionType,
        setType,
        depArr,
        setDepArr,
        optionsArray,
        setArray,
        upcoming,
        setUpcoming,
        past,
        setPast,
        events,
        setEvents,
    } = useScheduleContext();

    // add 5 meetings to events useState
    useEffect(() => {
        // console.log(localStorage);
        fetch(getBaseUrl() + "schedule/getPastMeetings?page1=1&limit=5", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setLoading(0);
                setPast(data.data.content);
                // for(var pair1 of data.data.content.entries()) {
                //   console.log(pair1);
                // }
                // console.log("hemang " + data.data.content);
                setTotal(data.data.total_pages);
                // console.log(data.data.total_pages)
                const calanderEvents = [];
                data.data.content.map((item) => {
                    const meeting = {};
                    meeting.start = item.start_date_time;
                    meeting.title = item.title;
                    meeting.id = item.id;
                    let backgroundColor = "#B31121";
                    if (item.priority == 1) {
                        backgroundColor = "#E1D71D";
                    } else if (item.priority == 2) {
                        backgroundColor = "#25991B";
                    }
                    meeting.backgroundColor = backgroundColor;
                    // console.log("hemang", meeting.title, meeting.backgroundColor)

                    calanderEvents.push(meeting);
                    meeting.end = moment(item.start_date_time).add(
                        moment.duration(1, "hours")
                    )._i;
                });
                setEvents(calanderEvents);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(getBaseUrl() + "schedule/getFutureMeetings?page1=1&limit=5", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                setLoading(0);
                setUpcoming(data.data.content);
                // for(var pair1 of data.data.content.entries()) {
                //   console.log(pair1);
                // }
                // console.log("hemang " + data.data.content);
                setPastTotal(data.data.total_pages);
                // console.log(data.data.total_pages)
                const calanderEvents = [];
                data.data.content.map((item) => {
                    const meeting = {};
                    meeting.start = item.start_date_time;
                    meeting.title = item.title;
                    meeting.id = item.id;
                    let backgroundColor = "#B31121";
                    if (item.priority == 1) {
                        backgroundColor = "#E1D71D";
                    } else if (item.priority == 2) {
                        backgroundColor = "#25991B";
                    }
                    meeting.backgroundColor = backgroundColor;
                    // console.log("hemang", meeting.title, meeting.backgroundColor)

                    calanderEvents.push(meeting);
                    meeting.end = moment(item.start_date_time).add(
                        moment.duration(1, "hours")
                    )._i;
                });
                setEvents(calanderEvents);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // list all depart  ments into depArr useState
    useEffect(() => {
        fetch(getBaseUrl() + "user/getAllDepartment", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                console.log("DATA::", data.data);
                const a = [];
                data.data.map((item) => {
                    a.push({
                        department_id: item.department_id,
                        label: item.title,
                    });
                });
                setDepArr(a);
                // console.log("HERE", depArr);
            })
            .catch((err) => {
                console.log(err);
            });

        fetch(getBaseUrl() + "user/getUsers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        })
            .then((data) => {
                // console.log(data.json());
                return data.json();
            })
            .then((data) => {
                console.log(data);
                const val = [];
                data.data.map((item) => {
                    // console.log(item);
                    val.push({
                        value: item.id,
                        label: item.first_name + " " + item.last_name,
                    });
                });
                setArray(val);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const changeScheduledTime = (e) => {
        setTime(e.target.value);
    };

    const changeScheduleFirst = (e) => {
        // console.log(e.target.value);
        setScheduleFirst(!scheduleFirst);
    };

    const UpdateUpcomingEventList = () => setNewEvent(newEvent + 1);
    const addParticipants = (e) => {
        console.log(e);
    };

    // const [tempEvents, setTempEvents] = useState();
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(
    //                 getBaseUrl + "schedule/get_meetings",
    //                 {
    //                     method: "GET",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                         Authorization:
    //                             "Bearer " + localStorage.getItem("token"),
    //                     },
    //                 }
    //             );
    //             const data = await response.json();
    //             if(data.success)
    //             {
    //                 console.log("Hemang Khurana")
    //             }
    //         } catch (error) {
    //             console.log("Error in fetching meetings", error);
    //         }
    //     };
    //     fetchData();
    // }, []);

    return (
        <div className={styles.scheduleContainer}>
            <div className={styles.topContainer}>
                <ScheduleHeader />
            </div>
            <div className={styles.bottomContainer}>
                <div className={`${styles.leftContainer} col-sm-8`}>
                    <div className={`${styles.calendarMainContainer} row`}>
                        <div className={styles.calendarDiv}>
                            <ScheduleCalendar events={events} />
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
