import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, Select, MenuItem, InputLabel } from "@mui/material";
import { useScheduleContext } from './context/ScheduleContext';
import { getBaseUrl } from '../../utils';

const EditMeeting = ({ open, onClose }) => {

    const {
        activeMeetingId, setActiveMeetingId,
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

    const handleApply = async () => {
        console.log("Save button clicked");
        const postData = {
            '_id' : activeMeetingId,
            'meetingSubject': edMeetingSubject,
            'scheduleDate': edScheduledDate,
            'scheduledLocation': edScheduledLocation,
            'scheduledStartTime': edScheduledStartTime,
            'scheduledEndTime': edScheduledEndTime,
            'selectedPriority': edSelectedPriority,
            'meetingMinutes':  edMeetingMinutes,
            'meetingSummary': edMeetingSummary,
        };
        console.log(postData)
        try {
            const response = await fetch(getBaseUrl() + 'schedule/update_meeting', {
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
                updateMeetingVariables();
                onClose();
                console.log(responseData.message);
            }
            else {
                console.log(responseData.message);
            }
        } catch (e) {
            console.log("error occured while deleting Meeting : " + e)
        }
        
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>Update Meeting Details</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Meeting Title"
                                variant="outlined"
                                value={edMeetingSubject}
                                onChange={(e) => setEdMeetingSubject(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Meeting Date"
                                variant="outlined"
                                type="date"
                                value={edScheduledDate}
                                onChange={(e) => setEdScheduledDate(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Meeting Location"
                                variant="outlined"
                                type="text"
                                value={edScheduledLocation}
                                onChange={(e) => setEdScheduledLocation(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Start Time"
                                variant="outlined"
                                type="time"
                                value={edScheduledStartTime}
                                onChange={(e) => setEdScheduledStartTime(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="End Time"
                                variant="outlined"
                                type="time"
                                value={edScheduledEndTime}
                                onChange={(e) => setEdScheduledEndTime(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Minutes of Meeting"
                                variant="outlined"
                                type="text"
                                value={edMeetingMinutes}
                                onChange={(e) => setEdMeetingMinutes(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Meeting Summary"
                                variant="outlined"
                                type="text"
                                value={edMeetingSummary}
                                onChange={(e) => setEdMeetingSummary(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                multiline
                                rows={4}
                            />
                        </Grid>
                        {/* <Grid item xs={6}>
                            <InputLabel id="department-label">Department</InputLabel>
                            <Select
                                labelId="department-label"
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                fullWidth
                                variant="outlined"
                            >
                                {departments.map((department) => (
                                    <MenuItem key={department.id} value={department.id}>
                                        {department.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid> */}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleApply} color="primary">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default EditMeeting;
