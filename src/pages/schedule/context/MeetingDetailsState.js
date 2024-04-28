import react, {useState} from 'react';

export const useMeetingDetailsState = () => {

  const [mdMeetingSubject, setMdMeetingSubject] = useState('');
  const [mdScheduledDate, setMdScheduledDate] = useState('');
  const [mdScheduledLocation, setMdScheduledLocation] = useState('');
  const [mdScheduledStartTime, setMdScheduledStartTime] = useState('');
  const [mdScheduledEndTime, setMdScheduledEndTime] = useState('');
  const [mdSelectedGroups, setMdSelectedGroups] = useState([]);
  const [mdSelectedDepartments, setMdSelectedDepartments] = useState([]);
  const [mdSelectedUsers, setMdSelectedUsers] = useState([]);
  const [mdSelectedPriority, setMdSelectedPriority] = useState(null);
  const [mdMeetingMinutes, setMdMeetingMinutes] = useState("");
  const [mdMeetingSummary, setMdMeetingSummary] = useState("");

    return {
      mdMeetingSubject, setMdMeetingSubject,
      mdScheduledDate, setMdScheduledDate,
      mdScheduledLocation, setMdScheduledLocation,
      mdScheduledStartTime, setMdScheduledStartTime,
      mdScheduledEndTime, setMdScheduledEndTime,
      mdSelectedGroups, setMdSelectedGroups,
      mdSelectedDepartments, setMdSelectedDepartments,
      mdSelectedUsers, setMdSelectedUsers,
      mdSelectedPriority, setMdSelectedPriority,
      mdMeetingMinutes, setMdMeetingMinutes,
      mdMeetingSummary, setMdMeetingSummary,
    };
};