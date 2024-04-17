import React, { useState } from "react";
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
import { useWrit } from "./context/WritContext";
const Filter = ({ open, onClose }) => {

    const {
        filteredData,
        setFilteredData,
        filtersApplied,
        setFiltersApplied,

        filterCloseChecked, setFilterCloseChecked,
        filterWritRespondentNames, setFilterWritRespondentNames,
        filterWritPriority, setFilterWritPriority,
        filterStatus, setFilterStatus,
        filterWritDepartment, setFilterWritDepartment,
        filterProject, setFilterProject,
        filterLandDepartment, setFilterLandDepartment,
        filterSurveyNumber, setFilterSurveyNumber,
        filterRevenueVillage, setFilterRevenueVillage,
        filterStartDate, setFilterStartDate,
        filterEndDate, setFilterEndDate,
        searchApplied, setSearchApplied,
        searchText, setSearchText, 
        loading, setLoading,


    } = useWrit();

    // const [closeChecked, setCloseChecked] = useState(false);
    // const [writRespondentNames, setWritRespondentNames] = useState("");
    // const [writPriority, setWritPriority] = useState([]);
    // const [status, setStatus] = useState(0);
    // const [writDepartment, setWritDepartment] = useState("");
    // const [project, setProject] = useState("");
    // const [landDepartment, setLandDepartment] = useState(false);
    // const [surveyNumber, setSurveyNumber] = useState("");
    // const [revenueVillage, setRevenueVillage] = useState("");
    // const [startDate, setStartDate] = useState("");
    // const [endDate, setEndDate] = useState("");
    // const [filtersApplied, setFiltersApplied] = useState(false);

    const marks = [
        { value: 0, label: "Writ Petition" },
        { value: 1, label: "Para Wise Remarks" },
        { value: 2, label: "Counters" },
        { value: 3, label: "Court Order" },
        { value: 4, label: "Contempt Case" },
        { value: 5, label: "Close" },
    ];

    
    const handleClose = () => {
        onClose();
    };


    const clearFilters = async () => {
        setFilterCloseChecked(false);
        setFilterWritRespondentNames("");
        setFilterWritPriority("");
        setFilterStatus(0);
        setFilterWritDepartment("");
        setFilterProject("");
        setFilterLandDepartment(false);
        setFilterSurveyNumber("");
        setFilterRevenueVillage("");
        setFilterStartDate("");
        setFilterEndDate("");
        
        setFiltersApplied(false);
        setSearchApplied(false);
        setSearchText("");
        onClose();
        setLoading(true);

        try{
            const response = await fetch(getBaseUrl() + "writ/getLatestWrit", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            const data = await response.json();
            if (data.success) {
                const updatedData = data.data.map((item) => item);
                setFilteredData(updatedData);
            }
            else {
                throw new Error("Error in response from backend");
            }
        }
        catch (error){
            console.log("Error in removing filters! ", error);
        } finally{
            setLoading(false);
        }
    };
    
    
    const handleApply = async () => {
        onClose();
        setLoading(true);
        try{
            const postData =  {searchText, filterWritRespondentNames, filterWritPriority, filterStatus, filterWritDepartment, filterProject, filterStartDate, filterEndDate};
            // console.log(postData)
            const response = await fetch(getBaseUrl() + "writ/filterWrit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
                body: JSON.stringify(postData), 
            });
            const responseData = await response.json();
            if (responseData.success) {
                setFiltersApplied(true);
                const updatedData = responseData.data.map((item) => item);
                setFilteredData(updatedData);
            } 
            else {
                console.error("Error from backend to apply filter", responseData.error);
            }
        }
        catch (error){
            console.log("Error in applying filters! ", error);
        }  finally{
            setLoading(false);
        }
        

        // Close the modal
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>Filter Data</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} mt={0}>
                    <Grid item xs={6}>
                        <TextField
                            label="Respondent Name"
                            value={filterWritRespondentNames}
                            onChange={(e) => setFilterWritRespondentNames(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Priority</InputLabel>
                            <Select
                                value={filterWritPriority}
                                onChange={(e) => setFilterWritPriority(e.target.value)}
                                input={<Input />}
                            >
                                <MenuItem value="Low">Low</MenuItem>
                                <MenuItem value="Medium">Medium</MenuItem>
                                <MenuItem value="High">High</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box mt={3} ml={5} mr={5}>
                            <Typography>Status</Typography>
                            <Slider
                                value={filterStatus}
                                onChange={(e, value) => setFilterStatus(value)}
                                step={1}
                                marks={marks}
                                min={0}
                                max={5}
                            />
                        </Box>
                    </Grid>
                    {/* <Grid item xs={1} mt={4} ></Grid> */}
                    {/* <Grid item xs={1} mt={5} ml={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={filterCloseChecked}
                                    onChange={(e) =>
                                        setFilterCloseChecked(e.target.checked)
                                    }
                                    color="primary"
                                />
                            }
                            label="Close"
                        />
                    </Grid> */}
                </Grid>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <TextField
                            sx={{ margin: "20px 0" }}
                            label="Department"
                            value={filterWritDepartment}
                            onChange={(e) => setFilterWritDepartment(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6}>
                        <TextField
                            sx={{ margin: "20px 0" }}
                            label="Project"
                            value={filterProject}
                            onChange={(e) => setFilterProject(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                </Grid>


                {/* <Grid item >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={filterLandDepartment}
                                onChange={(e) => {
                                    setFilterLandDepartment(e.target.checked);
                                }}
                            />
                        }
                        label="Land Department"
                    />
                </Grid>
                {filterLandDepartment && (
                    <Grid container spacing={2}>
                        <Grid item mt={-3} md={6}>
                            <TextField
                                sx={{ margin: "20px 0" }}
                                label="Survey Number"
                                value={filterSurveyNumber}
                                onChange={(e) =>
                                    setFilterSurveyNumber(e.target.value)
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item mt={-3} md={6}>
                            <TextField
                                sx={{ margin: "20px 0" }}
                                label="Revenue Village"
                                value={filterRevenueVillage}
                                onChange={(e) =>
                                    setFilterRevenueVillage(e.target.value)
                                }
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                )} */}

                

                <Grid container spacing={2}>
                    <Grid item md={6} mt={2}>
                        <TextField
                            label="Start Date"
                            type="date"
                            value={filterStartDate}
                            onChange={(e) => setFilterStartDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                    <Grid item md={6} mt={2}>
                        <TextField
                            label="End Date"
                            type="date"
                            value={filterEndDate}
                            onChange={(e) => setFilterEndDate(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={clearFilters} color="primary" disabled = {!filtersApplied} >
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

export default Filter;
