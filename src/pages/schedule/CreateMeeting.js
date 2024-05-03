import react, { useState, useEffect } from 'react';
import { InputGroup, Row, Col, Form, Modal } from "react-bootstrap";
import { Grid, TextField, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useScheduleContext } from './context/ScheduleContext';
import Select from "react-select";
import moment from "moment";
import { getBaseUrl } from '../../utils';

const CreateMeeting = ({ open, onClose}) => {

    const {
        meetingGroups,
        priorities,
        allEvents, setAllEvents,
        meetingSubject, setMeetingSubject,
        scheduledDate, setScheduledDate,
        scheduledLocation, setScheduledLocation,
        scheduledStartTime, setScheduledStartTime,
        scheduledEndTime, setScheduledEndTime,
        selectedGroups, setSelectedGroups,
        selectedDepartments, setSelectedDepartments,
        selectedUsers, setSelectedUsers,
        selectedPriority, setSelectedPriority,
        meetingMinutes, setMeetingMinutes,
        meetingSummary, setMeetingSummary,
        fetchMeetings,
    } = useScheduleContext();

    const clearMeetingFields = () => {
        // Reset form fields after creating the meeting
        setMeetingSubject('');
        setScheduledDate('');
        setScheduledLocation('');
        setScheduledStartTime('');
        setScheduledEndTime('');
        setSelectedGroups(null);
        setSelectedPriority(null);
    }

    const handleClose = () => {
        onClose();
        clearMeetingFields();
    };


    const handleSubmit = async () => {
        const postData = {
            'meetingSubject': meetingSubject,
            'scheduleDate': scheduledDate,
            'scheduledLocation': scheduledLocation,
            'scheduledStartTime': scheduledStartTime,
            'scheduledEndTime': scheduledEndTime,
            'selectedPriority': selectedPriority,
        }

        try{
            const response = await fetch(getBaseUrl() + 'schedule/create_new_meeting', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(postData),
            });
            const responseData = await response.json();
            console.log(responseData);
            onClose();
            clearMeetingFields();
            fetchMeetings();
        }
        catch (error){
            console.log("Error while creating meeting ", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Create New Meeting</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Meeting Subject"
                            placeholder="Enter Meeting Subject"
                            value={meetingSubject}
                            onChange={(e) => setMeetingSubject(e.target.value)}
                            // InputLabelProps={{
                            //     shrink: true,
                            // }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Schedule of Meet"
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Location of Meet"
                            placeholder="Enter Location"
                            value={scheduledLocation}
                            onChange={(e) => setScheduledLocation(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Start Time"
                            type="time"
                            value={scheduledStartTime}
                            onChange={(e) => setScheduledStartTime(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="End Time"
                            type="time"
                            value={scheduledEndTime}
                            onChange={(e) => setScheduledEndTime(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className="mt-3"
                            fullWidth 
                            select
                            SelectProps={{
                                native: true,
                            }}
                            label="Select Group"
                            name="meetingGroups"
                            options={meetingGroups}
                            SelectDisplayProps={{
                                multiple: true,
                            }}
                            value={selectedGroups}
                            onChange={(e) => {
                                const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
                                setSelectedGroups(selectedOptions);
                            }}
                        >
                            <option value=""> </option>
                                {meetingGroups.map((group) => (
                                <option value={group.value}>
                                    {group.label}
                                </option>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            className="mt-3"
                            fullWidth
                            select
                            SelectProps={{
                                native: true,
                            }}
                            label="Priority"
                            name="Priority"
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                        >
                            <option value=""> </option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </TextField>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                    Create Meeting
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateMeeting;