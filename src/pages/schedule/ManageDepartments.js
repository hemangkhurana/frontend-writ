import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Paper, Container, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { useScheduleContext } from "./context/ScheduleContext";
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";
import { getBaseUrl } from "../../utils";
import { Link } from "react-router-dom";

const ManageDepartments = () => {
    const [departmentId, setDepartmentId] = useState('');
    const [departmentName, setDepartmentName] = useState('');
    const [departmentDescription, setDepartmentDescription] = useState('');
    const [departmentUsers, setDepartmentUsers] = useState('');

    const [editDepartmentId, setEditDepartmentId] = useState('');
    const [editDepartmentName, setEditDepartmentName] = useState('');
    const [editDepartmentDescription, setEditDepartmentDescription] = useState('');
    const [editIndex, setEditIndex] = useState();

    const {newDepArr, setNewDepArr} = useScheduleContext();
    const [isDialogOpen, setDialogOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    getBaseUrl() + "schedule/get_all_departments",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization:
                                "Bearer " + localStorage.getItem("token"),
                        },
                    }
                );
                const data = await response.json();
                if (data.success) {
                    console.log("fetchData", data.data);
                    setNewDepArr(data.data)
                } else {
                    throw new Error("Network response was not ok.");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    const handleAddEntry = () => {
        if (departmentName && departmentDescription) {
            setNewDepArr([...newDepArr, { departmentName, departmentDescription }]);

            setDepartmentName('');
            setDepartmentDescription('');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditDepartmentId(newDepArr[index].departmentId);
        setEditDepartmentName(newDepArr[index].departmentName);
        setEditDepartmentDescription(newDepArr[index].departmentDescription);
        setDialogOpen(true);
    };

    const handleSaveEdit = () => {
        // complete this function
        const temp = [...newDepArr];
        temp[editIndex] = {
            'departmentId' : editDepartmentId,
            'departmentName' : editDepartmentName,
            'departmentDescription' : editDepartmentDescription
        }
        setNewDepArr(temp);
        console.log("Hemang", newDepArr[editIndex])
        setDialogOpen(false);
        setEditDepartmentId('');
        setEditDepartmentName('');
        setEditDepartmentDescription('');
    }

    const handleCancelEdit = () => {
        setDialogOpen(false);
        setEditDepartmentId('');
        setEditDepartmentName('');
        setEditDepartmentDescription('');
    }

    const handleDelete = (index) => {
        const updatedDepArr = [...newDepArr];
        updatedDepArr.splice(index, 1);
        setNewDepArr(updatedDepArr);
    };

    return (
        <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
            <Paper
                variant='outlined' 
                sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                style={{position:'relative'}}
            >
                <Link to="/user/schedule">
                    <IconButton
                        style={{ position: 'absolute', top: '5px', right: '5px'}}
                    >
                        <CloseIcon />
                    </IconButton>
                </Link>
                <Typography variant="h4" style={{marginBottom: '20px'}}>Departments</Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Department Name"
                            variant="outlined"
                            fullWidth
                            value={departmentName}
                            onChange={(e) => setDepartmentName(e.target.value)}
                            sx={{ borderRadius: '12px 12px 0 0' }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Department Description"
                            variant="outlined"
                            fullWidth
                            value={departmentDescription}
                            onChange={(e) => setDepartmentDescription(e.target.value)}
                            sx={{
                                borderRadius: '0 0 50px 50px',
                                mt: -1
                            }}
                        />
                    </Grid>
                </Grid>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddEntry}
                    style={{ margin: '10px 0 20px 0'}}
                >
                    Add Entry
                </Button>
                
                {newDepArr.map((item, index) => (
                    <Paper variant='outlined' style={{ padding: '10px', marginTop: '10px', position: 'relative' }}>
                        {/* Edit and Delete icons */}
                        <IconButton
                            onClick={() => handleEdit(index)}
                            style={{ position: 'absolute', top: '5px', right: '30px'}}
                            
                        >
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                            onClick={() => handleDelete(index)}
                            style={{ position: 'absolute', top: '5px', right: '5px'}}
                        >
                            <DeleteIcon fontSize="small"/>
                        </IconButton>

                        <strong>{item.departmentName}</strong>
                        <p style={{ marginLeft: '20px' }}>{item.departmentDescription}</p>
                    </Paper>
                ))}
                <Dialog open={isDialogOpen} onClose={handleCancelEdit}>
                    <DialogTitle>Edit Department</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Department Name"
                            variant="outlined"
                            fullWidth
                            value={editDepartmentName}
                            onChange={(e) => setEditDepartmentName(e.target.value)}
                            sx={{ borderRadius: '12px 12px 0 0' }}
                        />
                        <TextField
                            label="Department Description"
                            variant="outlined"
                            fullWidth
                            value={editDepartmentDescription}
                            onChange={(e) => setEditDepartmentDescription(e.target.value)}
                            sx={{
                                borderRadius: '0 0 50px 50px',
                                mt: -1
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelEdit} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleSaveEdit} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    )
};

export default headerNavbarWrapper(ManageDepartments);






