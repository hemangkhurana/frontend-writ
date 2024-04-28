import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox, Grid, Chip } from '@mui/material';
import Select from "react-select";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem } from "@mui/material";
import { useScheduleContext } from './context/ScheduleContext';

const CreateNewGroup = ({open, onClose}) => {

    const handleApply = () => {
        console.log("Save button clicked");
        onClose();
    }

    const [meetingGroupName, setMeetingGroupName] = useState();
    const [participants, setParticipants] = useState();
    const participantsList = [
        'Participant 1', 'Participant 2',  'Participant 3'
    ];

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Create Group</DialogTitle>
            <DialogContent>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Meeting Group Name"
                        name="meetingGroupName"
                        value={meetingGroupName}
                        onChange={(e) => setMeetingGroupName(e.target.value)}
                    />
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        multiple
                        SelectProps={{
                            native: true,
                        }}
                        label="Participants"
                        name="participants"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                    >
                        <option value=""> </option>
                        <option value="Hemang">Hemang</option>
                        <option value="Deepanshu">Deepanshu</option>
                    </TextField>
                </Grid>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Meeting Group Name"
                        name="meetingGroupName"
                        value={meetingGroupName}
                        onChange={(e) => setMeetingGroupName(e.target.value)}
                    />
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleApply} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateNewGroup;