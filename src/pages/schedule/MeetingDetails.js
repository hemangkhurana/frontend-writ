import React, { useEffect, useState } from "react";
import { Container, Paper, Button, IconButton, Chip,  Dialog, DialogTitle, DialogContent, DialogActions, } from "@mui/material";
import { useScheduleContext } from "./context/ScheduleContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from '@mui/icons-material/Delete';
import { getBaseUrl } from '../../utils';
import EditMeeting from "./EditMeeting";
import styles from './Schedule.module.css';

const MeetingDetails = () => {
    const {
        allEvents, setAllEvents,
        modalOpen, setModalOpen,
        selectedMeeting, setSelectedMeeting,
        activeMeetingId, setActiveMeetingId,

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

        fetchMeetings,
        updateMeetingVariables,

        edMeetingSubject, setEdMeetingSubject,
        edScheduledDate, setEdScheduledDate,
        edScheduledLocation, setEdScheduledLocation,
        edScheduledStartTime, setEdScheduledStartTime,
        edScheduledEndTime, setEdScheduledEndTime,
        edSelectedGroups, setEdSelectedGroups,
        edSelectedDepartments, setEdSelectedDepartments,
        edSelectedUsers, setEdSelectedUsers,
        edSelectedPriority, setEdSelectedPriority,
        edMeetingMinutes, setEdMeetingMinutes,
        edMeetingSummary, setEdMeetingSummary,
    } = useScheduleContext();

    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => {
        updateMeetingVariables();
    }, [activeMeetingId]);

    const handleButtonClick = (index) => {
        setActiveMeetingId(index);
    };

    const handleDelete = () => {
        setDeleteDialogOpen(true);
        console.log("Delete Buton Clicked");
    }

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
    }

    const handleFinalDelete = async () => {
        const postData = {'_id' : activeMeetingId};
        console.log(postData)
        try {
            const response = await fetch(getBaseUrl() + 'schedule/delete_meeting', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(postData),
            });
            const responseData = await response.json();
            if(responseData.success) {
                fetchMeetings();
                setDeleteDialogOpen(false);
                console.log(responseData.message);
            }
            else {
                console.log(responseData.message);
            }
        } catch (e) {
            console.log("error occured while deleting Meeting : " + e)
        }
    }

    const [isEditDetailsDialogOpen, setEditDetailsDialogOpen] = useState(false);
    const handleEditClick = () => {
        setEditDetailsDialogOpen(true);
    };
    // console.log("Active" + activeMeetingId);
    // console.log(allEvents[0]._id)

    return (
        <Container maxWidth="sm" sx={{ mb: 4 }}>
            <h3>Meeting Details</h3>
            <Paper
                variant="outlined"
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                style={{ position: "relative" }}
            >
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <h3>{mdMeetingSubject}</h3>
                        <div>
                            <IconButton onClick={handleEditClick}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={handleDelete}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                        <EditMeeting
                            open={isEditDetailsDialogOpen}
                            onClose={() => setEditDetailsDialogOpen(false)}
                        />
                    </div>
                    <p>
                        <strong>Meeting Date:</strong> {mdScheduledDate}
                    </p>
                    <p>
                        <strong>Start Time:</strong>
                        {mdScheduledStartTime}
                    </p>
                    <p>
                        <strong>End Time:</strong>
                        {mdScheduledEndTime}
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
                    <p className={styles.meetingMinutes}>{mdMeetingMinutes}</p>

                    <h4>Summary</h4>
                    <p className={styles.meetingSummary}>{mdMeetingSummary}</p>
                </div>
                <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
                    <DialogTitle>Confirm meeting deletion? "{mdMeetingSubject}"</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCancelDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleFinalDelete} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    );
};

export default MeetingDetails;
