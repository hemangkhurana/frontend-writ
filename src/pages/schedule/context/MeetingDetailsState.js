import react, {useState} from 'react';

export const useMeetingDetailsState = () => {

    const events = [
        {
          id: 1,
          title: 'Meeting 1',
          start: new Date(2024, 3, 10, 4, 0), // April 10, 2024, 4:00 AM
          end: new Date(2024, 3, 10, 6, 0),   // April 10, 2024, 6:00 AM
          location: 'DC Office',
          priority: 'high',
          departments: ['Marketing', 'Development', 'HR'],
          groups: ['Group 1', 'Group 2'],
          users: ['User 1', 'User 2'],
          minutesOfMeeting: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          summary: 'Meeting went well. Discussed project milestones and assigned tasks.',
        },
        {
          id: 3,
          title: 'Meeting 3',
          start: new Date(2024, 3, 10, 10, 0), // April 10, 2024, 10:00 AM
          end: new Date(2024, 3, 10, 12, 0),   // April 10, 2024, 12:00 PM
          location: 'DC Office',
          priority: 'medium',
          departments: ['Marketing', 'Development', 'HR'],
          groups: ['Group 3'],
          users: ['User 1', 'User 2'],
          minutesOfMeeting: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          summary: 'Meeting went well. Discussed project milestones and assigned tasks.',
        },
        {
          id: 2,
          title: 'Meeting 2',
          start: new Date(2024, 3, 25, 14, 0),  // April 12, 2024, 2:00 PM
          end: new Date(2024, 3, 25, 16, 0),    // April 12, 2024, 4:00 PM
          location: 'DC Office',
          priority: 'low',
          departments: ['Marketing', 'Development', 'HR'],
          groups: ['Group 2'],
          users: ['User 1', 'User 2'],
          minutesOfMeeting: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          summary: 'Meeting went well. Discussed project milestones and assigned tasks.',
        },
      ];
    const [newEvent, setNewEvent] = useState({ id: 0, title: "", start: "", end: "" });
    const [allEvents, setAllEvents] = useState(events);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState(0);
    const [activeMeetingIndex,setActiveMeetingIndex] = useState(1); 
    return {
        newEvent, setNewEvent,
        allEvents, setAllEvents,
        modalOpen, setModalOpen,
        selectedMeeting, setSelectedMeeting,
        activeMeetingIndex,setActiveMeetingIndex,
    };
};