import React, {useState, useEffect} from "react";
import styles from "./ScheduleHeader.module.css";
import {Container, TextField, Button, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, responsiveFontSizes, } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ClearIcon from '@mui/icons-material/Clear';
import { FilterMeeting } from "./FilterMeeting";
import { useScheduleContext } from "./context/ScheduleContext";
import CreateMeeting from "./CreateMeeting";

const ScheduleHeader = () => {
    const {
        show, setShow,
        modalOpen, setModalOpen,
    } = useScheduleContext();

    const [isFilterModalOpen, setFilterModalOpen] = useState(false);

    const handleFilter = () => {
        setFilterModalOpen(true);
    };

    return (
        <>
            <div className={styles.headerDiv}>
                <div className={styles.createNewMeetDiv}>
                    <Button 
                        variant="outlined"
                        onClick={() => setModalOpen(true)}
                    >
                        Create New Meeting
                    </Button>
                    <CreateMeeting 
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                />
                </div>

                <div className={styles.searchDiv}>
                    <TextField
                        className={styles.searchField}
                        size="small"
                        label="Search"
                        InputProps={{
                            endAdornment: (
                                <Button
                                    className={styles.searchBtn}
                                    variant="text"
                                    startIcon={<SearchIcon />}
                                >
                                    Search
                                </Button>
                            ),
                        }}
                    />
                </div>

                <div className={styles.filterBtnDiv}>
                    <Button
                        className={styles.filterBtn}
                        variant="text"
                        onClick={handleFilter}
                        startIcon={<FilterListIcon />}
                    >
                        Filter
                    </Button>
                    <FilterMeeting
                        open={isFilterModalOpen}
                        onClose={() => setFilterModalOpen(false)}
                    />

                    {/* <Button
                        className={styles.filterBtn}
                        variant="text"
                        startIcon={<ClearIcon />} 
                    >
                        Clear Filters
                    </Button> */}
                </div>

            </div>
        </>
    )
} 

export default ScheduleHeader;