import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControlLabel,
    Checkbox,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Input,
    Box,
    Typography,
    Slider,
    Grid,
} from "@mui/material";

import { getBaseUrl } from "../../utils";

export const FilterMeeting = ({ open, onClose}) => {
    
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
            <DialogTitle>Filter Data</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} mt={0}>
                    <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel >Priority</InputLabel>
                        <Select
                            defaultValue=""
                            label="Priority"
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                </Grid>

            </DialogContent>
            <DialogActions>
                <Button  
                    color="primary" 
                    // disabled = {!filtersApplied} 
                >
                    Clear Filters
                </Button>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleApply} color="primary">
                    Apply
                </Button>
            </DialogActions>
        </Dialog>
    );
};