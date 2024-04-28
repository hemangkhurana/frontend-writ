import React, {useState} from 'react';

export const useScheduleState = () => {
    const [meetingGroups, setMeetingGroups] = useState([]);
    const [actionType, setType] = useState(1);
    const [depArr, setDepArr] = useState([]);
    const [newDepArr, setNewDepArr] = useState([]);
    const [optionsArray, setArray] = useState([]);
    const [show, setShow] = useState(false);
    const [upcoming, setUpcoming] = useState([]);
    const [past,setPast] = useState([]);
    const [events, setEvents] = useState([]);
    const [usersList, setUsersList] = useState([]);
    
    return {
        meetingGroups, setMeetingGroups,
        actionType, setType,
        depArr, setDepArr,
        optionsArray, setArray,
        show, setShow,
        upcoming, setUpcoming,
        past, setPast,
        events, setEvents,
        newDepArr, setNewDepArr,
        usersList, setUsersList,
    };
};