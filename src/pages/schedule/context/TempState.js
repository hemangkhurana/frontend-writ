import react, {useState} from 'react';
import moment from "moment";

export const useTempState = () => {
    const [scheduledDate, setScheduledDate] = useState(
        moment().add(1, "days").format("YYYY-MM-DD")
    );
    const [scheduledStartTime, setStartTime] = useState(
    moment("10:00", "hh:mm").format("hh:mm")
    );
    const [scheduledEndTime, setEndTime] = useState(
        moment("10:00", "hh:mm").format("hh:mm")
    );

    const [priority, setPriority] = useState();
    const [agenda, setAgenda] = useState([]);
    const [agendaTo, setAgendaTo] = useState("All Members");
    const [agendaDes, setAgendaDes] = useState("Description");

    const [scheduledLocation, setScheduledLocation] = useState("");

    const priorities = [
        { key: "1", label: "LOW" },
        { key: "2", label: "NORMAL" },
        { key: "3", label: "HIGH" },
    ];


    const addAgenda = () => {
        const a = agenda;
        a.push({ assignedTo: agendaTo, description: agendaDes });
        setAgendaDes("");
        setAgendaTo("");
        setAgenda(a);
    };

    const [relatedDepartments, setRelatedDepartments] = useState([]);
    const [recurring, setRecurring] = useState(1);
    const [participantsList, setparticipants] = useState([]);

    return {
        scheduledDate, setScheduledDate,
        scheduledStartTime, setStartTime,
        scheduledEndTime, setEndTime,
        scheduledLocation, setScheduledLocation,
        priority, setPriority,
        agenda, setAgenda,
        agendaTo, setAgendaTo,
        agendaDes, setAgendaDes,
        priorities,
        addAgenda,
        relatedDepartments, setRelatedDepartments,
        recurring, setRecurring,
        participantsList, setparticipants,
    };
};