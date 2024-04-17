import React, {useState, useEffect} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid} from "@mui/material";
const EditMeeting = ({open, onClose}) => {

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
                <Grid container spacing={2} mt={0}>
                    <Grid item xs={6}>
                        Hemang
                    </Grid>
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