import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, TextField, Select, MenuItem, InputLabel } from "@mui/material";

const EditMeeting = ({ open, onClose }) => {
    const [meetingTitle, setMeetingTitle] = useState('');
    const [meetingDate, setMeetingDate] = useState('');
    const [meetingLocation, setMeetingLocation] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [groups, setGroups] = useState([]);
    const [users, setUsers] = useState([]);
    const [minutesOfMeeting, setMinutesOfMeeting] = useState('');
    const [summary, setSummary] = useState('');

    const handleApply = () => {
        console.log("Save button clicked");
        onClose();
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
                                value={meetingTitle}
                                onChange={(e) => setMeetingTitle(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Meeting Date"
                                variant="outlined"
                                type="date"
                                value={meetingDate}
                                onChange={(e) => setMeetingDate(e.target.value)}
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
                                type="date"
                                value={meetingDate}
                                onChange={(e) => setMeetingDate(e.target.value)}
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
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
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
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
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
