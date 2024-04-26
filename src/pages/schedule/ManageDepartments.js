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

    const [editDepartmentId, setEditDepartmentId] = useState('');
    const [editDepartmentName, setEditDepartmentName] = useState('');
    const [editDepartmentDescription, setEditDepartmentDescription] = useState('');
    const [editIndex, setEditIndex] = useState();

    const {newDepArr, setNewDepArr} = useScheduleContext();
    const [isEditDialogOpen, seEditDialogOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState();
    const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);


    const fetchData = async () => {
        try {
            const response = await fetch(
                getBaseUrl() + "schedule/get_departments",
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
                setNewDepArr(data.data)
                console.log("fetchData", data.data);
            } else {
                throw new Error("Network response was not ok.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    const handleAddEntry = async () => {
        if (departmentName && departmentDescription) {
            const formData = {'departmentName': departmentName, 'departmentDescription': departmentDescription};
            try {
                const response = await fetch(getBaseUrl() + 'schedule/add_department', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                    body: JSON.stringify(formData),
                });
                const responseData = await response.json();
                if(responseData.success)
                {
                    fetchData();
                    console.log('department created successfully')
                }
                else
                {
                    console.log('unsuccessful while creating department')
                }
            } catch (error) {
                console.log("Error during creating new department");
            }

            setDepartmentName('');
            setDepartmentDescription('');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setEditDepartmentId(newDepArr[index]._id);
        setEditDepartmentName(newDepArr[index].departmentName);
        setEditDepartmentDescription(newDepArr[index].departmentDescription);
        seEditDialogOpen(true);
    };

    
    const handleSaveEdit = async () => {
        const postData = {'_id': editDepartmentId, 'departmentName' : editDepartmentName, 'departmentDescription' : editDepartmentDescription,}
        try {
            const response = await fetch(getBaseUrl() + 'schedule/update_department', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(postData),
            });
            const responseData = await response.json();
            console.log(responseData.data)
            if(responseData.success)
            {
                seEditDialogOpen(false);
                setEditDepartmentId('');
                setEditDepartmentName('');
                setEditDepartmentDescription('');
                fetchData();
            }
        } catch (error) {
            console.log("Error during deleting new department : " + error);
        }
    }
    
    const handleCancelEdit = () => {
        seEditDialogOpen(false);
        setEditDepartmentId('');
        setEditDepartmentName('');
        setEditDepartmentDescription('');
    }
    
    const handleDelete = (index) => {
        setDeleteIndex(index)
        setDeleteDialogOpen(true)
    }

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setDeleteIndex();
    }

    const handleFinalDelete = async () => {
        const postData = newDepArr[deleteIndex]._id
        try {
            const response = await fetch(getBaseUrl() + 'schedule/delete_department', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(postData),
            });
            const responseData = await response.json();
            console.log(responseData.message)
            if(responseData.success)
            {
                setDeleteDialogOpen(false);
                setDeleteIndex();
                fetchData();
            }
        } catch (error) {
            console.log("Error during deleting new department : " + error);
        }
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
                <Dialog open={isEditDialogOpen} onClose={handleCancelEdit}>
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

                <Dialog open={isDeleteDialogOpen} onClose={handleCancelEdit}>
                    <DialogTitle>Are you sure to Delete Department?</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleCancelDelete} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleFinalDelete} color="primary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Paper>
        </Container>
    )
};

export default headerNavbarWrapper(ManageDepartments);






