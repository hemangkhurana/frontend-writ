import React, {useState} from 'react';
import { Container, Paper,Button, IconButton, Chip } from '@mui/material';
import { useScheduleContext } from './context/ScheduleContext';
import EditIcon from '@mui/icons-material/Edit';
import EditMeeting from './EditMeeting';

const MeetingDetails = () => {
    const {
        newEvent, setNewEvent,
        allEvents, setAllEvents,
        modalOpen, setModalOpen,
        selectedMeeting, setSelectedMeeting,
        activeMeetingIndex,setActiveMeetingIndex,
        } = useScheduleContext()

    const handleButtonClick = (index) => {
        setActiveMeetingIndex(index);
      };
    
    const [ isEditDetailsDialogOpen, setEditDetailsDialogOpen ] = useState(false);
    const handleEditClick = () => {
      setEditDetailsDialogOpen(true)
    }


    return (
        <Container maxWidth='sm' sx={{ mb: 4 }}>
          <h3>Meeting Details</h3>
          {allEvents.map((meeting, index) => (
            <div key={index}>
              {activeMeetingIndex === meeting.id && (
                <Paper
                  variant='outlined'
                  sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                  style={{ position: 'relative' }}
                >
                  <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3>{meeting.title}</h3>
                      <IconButton onClick={handleEditClick}>
                        <EditIcon/>
                      </IconButton>
                      <EditMeeting
                        open={isEditDetailsDialogOpen}
                        onClose={() => setEditDetailsDialogOpen(false)}
                      />
                  </div>
                    <p>
                      <strong>Start Date:</strong> {meeting.start.toLocaleDateString()} {meeting.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <p>
                      <strong>End Date:</strong> {meeting.end.toLocaleDateString()} {meeting.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    <div style={{marginBottom:10, }}>
                      <h4>Departments</h4>
                      {meeting.departments.map((dept, deptIndex) => (
                        <Chip key={deptIndex} label={dept} variant="outlined" style={{ marginRight: 10, marginBottom: 5 }} />
                      ))}
                    </div>

                    <div style={{marginBottom:10, }}>
                      <h4>Groups</h4>
                      {meeting.groups.map((group, groupIndex) => (
                        <Chip key={groupIndex} label={group} variant="outlined" style={{ marginRight: 10, marginBottom: 5 }} />
                      ))}
                    </div>

                    <div style={{marginBottom:10, }}>
                      <h4>Users</h4>
                      {meeting.users.map((user, userIndex) => (
                        <Chip key={userIndex} label={user} variant="outlined" style={{ marginRight: 10, marginBottom: 5 }} />
                      ))}
                    </div>

                    <h4>Minutes of Meeting</h4>
                    <p>{meeting.minutesOfMeeting}</p>

                    <h4>Summary</h4>
                    <p>{meeting.summary}</p>
                  </div>
                </Paper>
              )}
            </div>
          ))}
      </Container>
    );
};

export default MeetingDetails;
