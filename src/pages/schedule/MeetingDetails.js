import React, {useEffect, useState} from 'react';
import { Container, Paper,Button, IconButton, Chip } from '@mui/material';
import { useScheduleContext } from './context/ScheduleContext';
import EditIcon from '@mui/icons-material/Edit';
import EditMeeting from './EditMeeting';

const MeetingDetails = () => {
    const {
        allEvents, setAllEvents,
        modalOpen, setModalOpen,
        selectedMeeting, setSelectedMeeting,
        activeMeetingId,setActiveMeetingId,

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
        } = useScheduleContext()

    useEffect(() => {
      if(activeMeetingId!==null) {
        const activeObject = allEvents.find(obj => obj._id === activeMeetingId);
        if(activeObject) {
          setMdMeetingSubject(activeObject.title);
          setMdScheduledDate(activeObject.start.toLocaleDateString());
          setMdScheduledStartTime(activeObject.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          setMdScheduledEndTime(activeObject.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
          setMdScheduledLocation(activeObject.location);
          setMdSelectedPriority(activeObject.priority);
          setMdMeetingMinutes(activeObject.minutesOfMeeting);
          setMdMeetingSummary(activeObject.summary);
        }
      }
    }, [activeMeetingId])

    const handleButtonClick = (index) => {
        setActiveMeetingId(index);
      };
    
    const [ isEditDetailsDialogOpen, setEditDetailsDialogOpen ] = useState(false);
    const handleEditClick = () => {
      setEditDetailsDialogOpen(true)
    }
    // console.log("Active" + activeMeetingId);
    // console.log(allEvents[0]._id)


    return (
        <Container maxWidth='sm' sx={{ mb: 4 }}>
          <h3>Meeting Details</h3>
                <Paper
                  variant='outlined'
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                  style={{ position: 'relative' }}
                >
                  <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3>{mdMeetingSubject}</h3>
                      <IconButton onClick={handleEditClick}>
                        <EditIcon/>
                      </IconButton>
                      <EditMeeting
                        open={isEditDetailsDialogOpen}
                        onClose={() => setEditDetailsDialogOpen(false)}
                      />
                  </div>
                    <p>
                      <strong>Meeting Date:</strong> {mdScheduledDate}
                    </p>
                    <p>
                      <strong>Start Time:</strong>{mdScheduledStartTime}
                    </p>
                    <p>
                      <strong>End Time:</strong>{mdScheduledEndTime}
                    </p>

                    {/* <div style={{marginBottom:10, }}>
                      <h4>Departments</h4>
                      {meeting.departments.map((dept, deptIndex) => (
                        <Chip key={deptIndex} label={dept} variant="outlined" style={{ marginRight: 10, marginBottom: 5 }} />
                      ))}
                    </div> */}

                    {/* <div style={{marginBottom:10, }}>
                      <h4>Groups</h4>
                      {meeting.groups.map((group, groupIndex) => (
                        <Chip key={groupIndex} label={group} variant="outlined" style={{ marginRight: 10, marginBottom: 5 }} />
                      ))}
                    </div> */}

                    {/* <div style={{marginBottom:10, }}>
                      <h4>Users</h4>
                      {meeting.users.map((user, userIndex) => (
                        <Chip key={userIndex} label={user} variant="outlined" style={{ marginRight: 10, marginBottom: 5 }} />
                      ))}
                    </div> */}

                    <h4>Minutes of Meeting</h4>
                    <p>{mdMeetingMinutes}</p>

                    <h4>Summary</h4>
                    <p>{mdMeetingSummary}</p>
                  </div>
                </Paper>
      </Container>
    );
};

export default MeetingDetails;
