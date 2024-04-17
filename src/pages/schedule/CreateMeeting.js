import react, { useState, useEffect } from 'react';
import { InputGroup, Row, Col, Form, Modal } from "react-bootstrap";
import { Grid, TextField, Button, Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useScheduleContext } from './context/ScheduleContext';
import Select from "react-select";
import moment from "moment";

const CreateMeeting = ({ open, onClose}) => {

    const {
        allEvents, setAllEvents,
        meetingGroups, setMeetingGroups,
        priorities,
    } = useScheduleContext();

    const [meetingSubject, setMeetingSubject] = useState('');
    const [scheduledDate, setScheduledDate] = useState('');
    const [scheduledLocation, setScheduledLocation] = useState('');
    const [scheduledStartTime, setScheduledStartTime] = useState('');
    const [scheduledEndTime, setScheduledEndTime] = useState('');
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState(null);


    const handleCreateMeeting = () => {
        const newMeeting = {
            id: allEvents.length + 1,
            title: meetingSubject,
            start: moment(scheduledDate + ' ' + scheduledStartTime, 'YYYY-MM-DD HH:mm').toDate(),
            end: moment(scheduledDate + ' ' + scheduledEndTime, 'YYYY-MM-DD HH:mm').toDate(),
            location: scheduledLocation,
            groups: selectedGroup ? selectedGroup.map(group => group.label) : [],
            priority: selectedPriority ? selectedPriority.value : '',
            // Add other properties as needed
        };
    
        setAllEvents([...allEvents, newMeeting]);

        // Reset form fields after creating the meeting
        setMeetingSubject('');
        setScheduledDate('');
        setScheduledLocation('');
        setScheduledStartTime('');
        setScheduledEndTime('');
        setSelectedGroup(null);
        setSelectedPriority(null);
    };

    const handleCancelCreateMeeting = () => {
        // Reset form fields after creating the meeting
        setMeetingSubject('');
        setScheduledDate('');
        setScheduledLocation('');
        setScheduledStartTime('');
        setScheduledEndTime('');
        setSelectedGroup(null);
        setSelectedPriority(null);
    }

    const handleClose = () => {
        onClose();
    };

    const handleApply = async () => {
        onClose();
        try{
            console.log("Hemang");
        }
        catch (error){
            console.log("Error in applying filters! ", error);
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
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Schedule of Meet"
                            type="date"
                            value={scheduledDate}
                            onChange={(e) => setScheduledDate(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Location of Meet"
                            placeholder="Enter Location"
                            value={scheduledLocation}
                            onChange={(e) => setScheduledLocation(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Start Time"
                            type="time"
                            value={scheduledStartTime}
                            onChange={(e) => setScheduledStartTime(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="End Time"
                            type="time"
                            value={scheduledEndTime}
                            onChange={(e) => setScheduledEndTime(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            className="mt-3"
                            name="groupId"
                            type="text"
                            placeholder="Select Meeting Group"
                            closeMenuOnSelect={true}
                            options={meetingGroups}
                            onChange={(selected) => setSelectedGroup(selected)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Select
                            className="mt-3"
                            name="priority"
                            type="text"
                            placeholder="Priority"
                            closeMenuOnSelect={true}
                            options={priorities}
                            value={selectedPriority}
                            onChange={(selected) => setSelectedPriority(selected)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='contained' onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleApply}>
                    Create Meeting
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateMeeting;