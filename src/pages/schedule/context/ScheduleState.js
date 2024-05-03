import React, { useState } from "react";
import { getBaseUrl } from "../../../utils";

export const useScheduleState = () => {
    const [newDepArr, setNewDepArr] = useState([]);
    const [usersList, setUsersList] = useState([]);
    const meetingGroups = [
        { value: "group1", label: "Group 1" },
        { value: "group2", label: "Group 2" },
        { value: "group3", label: "Group 3" },
    ];

    const dumyEvents = [
        {
            id: 1,
            title: "Meeting 1",
            start: new Date(2024, 3, 10, 4, 0), // April 10, 2024, 4:00 AM
            end: new Date(2024, 3, 10, 7, 0), // April 10, 2024, 6:00 AM
            location: "DC Office",
            priority: "high",
            departments: ["Marketing", "Development", "HR"],
            groups: ["Group 1", "Group 2"],
            users: ["User 1", "User 2"],
            minutesOfMeeting:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            summary:
                "Meeting went well. Discussed project milestones and assigned tasks.",
        },
        {
            id: 3,
            title: "Meeting 3",
            start: new Date(2024, 3, 10, 5, 0), // April 10, 2024, 10:00 AM
            end: new Date(2024, 3, 10, 6, 0), // April 10, 2024, 12:00 PM
            location: "DC Office",
            priority: "medium",
            departments: ["Marketing", "Development", "HR"],
            groups: ["Group 3"],
            users: ["User 1", "User 2"],
            minutesOfMeeting:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            summary:
                "Meeting went well. Discussed project milestones and assigned tasks.",
        },
        {
            id: 2,
            title: "Meeting 2",
            start: new Date(2024, 3, 25, 14, 0), // April 12, 2024, 2:00 PM
            end: new Date(2024, 3, 25, 16, 0), // April 12, 2024, 4:00 PM
            location: "DC Office",
            priority: "low",
            departments: ["Marketing", "Development", "HR"],
            groups: ["Group 2"],
            users: ["User 1", "User 2"],
            minutesOfMeeting:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            summary:
                "Meeting went well. Discussed project milestones and assigned tasks.",
        },
    ];
    //   console.log("events 0" + events[0].start)
    const [allEvents, setAllEvents] = useState(dumyEvents);
    // const [allEvents, setAllEvents] = useState();
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(0);
    const [activeMeetingId, setActiveMeetingId] = useState("");
    const [tempEvents, setTempEvents] = useState([]);

    const [meetingSubject, setMeetingSubject] = useState("");
    const [scheduledDate, setScheduledDate] = useState("");
    const [scheduledLocation, setScheduledLocation] = useState("");
    const [scheduledStartTime, setScheduledStartTime] = useState("");
    const [scheduledEndTime, setScheduledEndTime] = useState("");
    const [selectedGroups, setSelectedGroups] = useState([]);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedPriority, setSelectedPriority] = useState(null);
    const [meetingMinutes, setMeetingMinutes] = useState("");
    const [meetingSummary, setMeetingSummary] = useState("");

    const priorities = [
        { key: "1", label: "LOW" },
        { key: "2", label: "NORMAL" },
        { key: "3", label: "HIGH" },
    ];

    const fetchMeetings = async () => {
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
            if (data.success) {
                // console.log("Hemang" + data.data);
                // setTempEvents(data.data);
                console.log(...data.data);
                const formattedEvents = data.data.map((event) => {
                    const tempDate = event.date.split("T");
                    const tempStart = event.startTime.split("T");
                    const tempEnd = event.endTime.split("T");
                    const dateParts = tempDate[0].split("-");
                    const startTimeParts = tempStart[1].split(":");
                    const endTimeParts = tempEnd[1].split(":");
                    // console.log(...dateParts)
                    // console.log(...startTimeParts)
                    // console.log(...endTimeParts)
                    const start = new Date(
                        dateParts[0],
                        dateParts[1] - 1,
                        dateParts[2],
                        startTimeParts[0],
                        startTimeParts[1]
                    );
                    // console.log("start"+ start)
                    const end = new Date(
                        dateParts[0],
                        dateParts[1] - 1,
                        dateParts[2],
                        endTimeParts[0],
                        endTimeParts[1]
                    );
                    // console.log("end"+ end)
                    // console.log("id" + event._id)
                    return {
                        _id: event._id,
                        title: event.title,
                        start: start,
                        end: end,
                        location: event.location,
                        priority: event.priority,
                        minutesOfMeeting: event.minutesOfMeeting,
                        summary: event.summary,
                    };
                });
                // console.log('Formatted Events');
                // console.log(...formattedEvents);
                // console.log(typeof formattedEvents);
                setAllEvents(formattedEvents);
                // console.log(data.data[0]._id);
                setActiveMeetingId(data.data[0]._id);
            } else {
                console.log("Khurana Hemang");
            }
        } catch (error) {
            console.log("Error in fetching meetings", error);
        }
    };

    return {
        meetingGroups,
        newDepArr,
        setNewDepArr,
        usersList,
        setUsersList,
        allEvents,
        setAllEvents,
        modalOpen,
        setModalOpen,
        selectedMeeting,
        setSelectedMeeting,
        activeMeetingId,
        setActiveMeetingId,
        priorities,
        tempEvents,
        setTempEvents,

        meetingSubject,
        setMeetingSubject,
        scheduledDate,
        setScheduledDate,
        scheduledLocation,
        setScheduledLocation,
        scheduledStartTime,
        setScheduledStartTime,
        scheduledEndTime,
        setScheduledEndTime,
        selectedGroups,
        setSelectedGroups,
        selectedDepartments,
        setSelectedDepartments,
        selectedUsers,
        setSelectedUsers,
        selectedPriority,
        setSelectedPriority,
        meetingMinutes,
        setMeetingMinutes,
        meetingSummary,
        setMeetingSummary,

        fetchMeetings,
    };
};
