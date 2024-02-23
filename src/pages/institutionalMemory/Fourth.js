import React, { useEffect, useState } from "react";
import { getBaseUrl } from "../../utils";
import { Form, Field } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";
import arrayMutators from "final-form-arrays";
import {
    TextField,
    Button,
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import { useWrit } from "./context/WritContext";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";


const FourthStep = React.memo(
    ({onPrev, onNext}) => {
        const [formInstances, setFormInstances] = useState([]);
        const [enabledAccordionId, setEnabledAccordionId] = useState(0);
        const { 
            writNumber, courtOrderFileAttachment, setCourtOrderFileAttachment, 
            loading, setLoading,
        } = useWrit("");

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(
                        getBaseUrl() + "writ/getCourtOrders",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization:
                                    "Bearer " + localStorage.getItem("token"),
                            },
                            body: JSON.stringify({writNumber}), 
                        }
                    );
                    const data = await response.json();
                    if (data.success) {
                        console.log("fetchData", data.data);
                        setFormInstances(data.data);
                        console.log("formInstancesFetched", formInstances);
                    } else {
                        throw new Error("Network response was not ok.");
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
                finally {
                    setLoading(false);
                }
            };
            fetchData();
        }, []);
        
        const onSubmit = (values) => {
            console.log("Court Order Form Data:", values);
            // Add logic to send data to the backend or perform other actions
        };

        
        const handleUpdateForm = async (postData) => {
            console.log(postData);
            setEnabledAccordionId(-1);
            
            if (!postData){
                const formData = new FormData();
                formData.append('writNumber', writNumber);
                formData.append('flag', -1);
                try {
                    const response = await fetch(getBaseUrl() + 'writ/addCourtOrder', {
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                        },
                        body: formData,
                    });
            
                    // Check if the HTTP request was successful (status code in the range 200-299)
                    if (response.ok) {
                    // If the response is successful, log a success message
                    console.log('Data sent successfully');
                } else {
                    // If the response is not successful, throw an error
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                // Handle any errors that occurred during the fetch
                    console.error('Error sending data:', error);
                }
            }
            else{
                for (const data of postData){
                    if (!data){
                        continue;
                    }
                    if (data['writNumber'] == '' || data['courtOrderDate'] == ''){
                        alert("Please fill all required fields")
                        return;
                    }
                }

                let flag = 1;
                for (const data of postData) {
                    if (!data){
                        continue;
                    }
                    const formData = new FormData();
                    Object.entries(data).forEach(([key, value]) => {
                        formData.append(key, value);
                    });
                    formData.append('writNumber', writNumber);
                    formData.append('flag', flag);
                    if (flag==1){
                        formData.append('courtOrderFileAttachment', courtOrderFileAttachment);
                    }
                    flag = 0;
                
                    try {
                        const response = await fetch(getBaseUrl() + 'writ/addCourtOrder', {
                        method: 'POST',
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('token'),
                        },
                        body: formData,
                        });
                
                        // Check if the HTTP request was successful (status code in the range 200-299)
                        if (response.ok) {
                        // If the response is successful, log a success message
                        console.log('Data sent successfully');
                        } else {
                        // If the response is not successful, throw an error
                        throw new Error('Network response was not ok');
                        }
                    } catch (error) {
                        // Handle any errors that occurred during the fetch
                        console.error('Error sending data:', error);
                    }
                }
                alert('Writ Data has been uploaded successfully');
            }
            
          };


        console.log("enabledAccordionId", enabledAccordionId);

        const handleEdit = (index) => {
            setEnabledAccordionId(index);
        }

        useEffect(() => {
            console.log("useeffect forminstances : ", formInstances);
        }, [formInstances])


        const [confirmationOpen, setConfirmationOpen] = useState(false);
        const [removeFormIndex, setRemoveFormIndex] = useState();
        const handleRemoveForm = (formIndex) => {
            setConfirmationOpen(true);
            setRemoveFormIndex(formIndex);
        };

        const handleRemoveConfirmation = () => {
            // const deleteObject = formInstances[removeFormIndex];
            Form.mutators.remove("court Orders", removeFormIndex);
            setEnabledAccordionId(-1);
            handleConfirmationClose();
        };
        const handleConfirmationClose = () => {
            setConfirmationOpen(false);
            setRemoveFormIndex();
        };


        const [updateConfirmationOpen, setUpdateConfirmationOpen] = useState(false);

        const handleUpdateConfirmationClose = () => {
            setUpdateConfirmationOpen(false);
        }

        const handleUpdateOkConfirmation = () => {
            handleUpdateConfirmationClose();
        }

        const downloadPdf = async () => {
            try {
                console.log(courtOrderFileAttachment);
                const response = await fetch(getBaseUrl() + 'writ/downloadPdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    },
                    body: JSON.stringify({ writNumber, courtOrderFileAttachment }),
                });
                if (!response.ok) {
                    alert('Unable to download pdf, some error has occured')
                    throw new Error('Failed to download file');
                  }
                  const blob = await response.blob();
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'file.pdf';
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
    
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        };
            

        return (
            <Form
                mutators={arrayMutators}
                onSubmit={onSubmit}
                initialValues={{ courtOrders: formInstances }}
                render={({ handleSubmit, form }) => (
                    <>
                        <FieldArray name="courtOrders">
                            {({ fields }) => (
                                <Grid container spacing={2}>
                                    {fields.map((name, index) => (
                                        <div key={index}>
                                            <Grid container style={{ marginBottom: '20px' }}>
                                                <Grid item sm={12}>
                                                    <Accordion key={index} defaultExpanded={true}>
                                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}
                                                            aria-controls={`panel${index}-content`}
                                                            id={`panel${index}-header`}
                                                        >
                                                            <Typography
                                                                variant="p"
                                                                gutterBottom
                                                            >
                                                                Court Order #
                                                                {index + 1}
                                                            </Typography>
                                                        </AccordionSummary>

                                                        <Grid item xs={12} key={name}>
                                                            <AccordionDetails>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs={6}>
                                                                        <Field
                                                                            name={`${name}.writNumber`}
                                                                            render={({
                                                                                input,
                                                                                meta,
                                                                            }) => (
                                                                                <TextField
                                                                                    label="Writ Number"
                                                                                    multiline
                                                                                    {...input}
                                                                                    fullWidth
                                                                                    disabled
                                                                                    value={
                                                                                        writNumber
                                                                                    }
                                                                                    required
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={6}
                                                                    >
                                                                        <Field
                                                                            name={`${name}.courtOrderDate`}
                                                                            render={({
                                                                                input,
                                                                                meta,
                                                                            }) => (
                                                                                <TextField
                                                                                    label="Court Order Date"
                                                                                    {...input}
                                                                                    type="date"
                                                                                    defaultValue=""
                                                                                    fullWidth
                                                                                    // disabled={
                                                                                    //     enabledAccordionId !==
                                                                                    //     index
                                                                                    // }
                                                                                    required
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <Field
                                                                            name={`${name}.courtOrderText`}
                                                                            render={({
                                                                                input,
                                                                                meta,
                                                                            }) => (
                                                                                <TextField
                                                                                    label="Court Order"
                                                                                    {...input}
                                                                                    multiline
                                                                                    fullWidth
                                                                                    rows={3}
                                                                                    // disabled={
                                                                                    //     enabledAccordionId !==
                                                                                    //     index
                                                                                    // }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid
                                                                        item
                                                                        xs={12}
                                                                    >
                                                                        <Field
                                                                            name={`${name}.courtOrderDcComments`}
                                                                            render={({
                                                                                input,
                                                                                meta,
                                                                            }) => (
                                                                                <TextField
                                                                                    label="Dc Comments for Court Order"
                                                                                    {...input}
                                                                                    fullWidth
                                                                                    multiline
                                                                                    rows={2}
                                                                                    // disabled={
                                                                                    //     enabledAccordionId !==
                                                                                    //     index
                                                                                    // }
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionDetails>
                                                        </Grid>
                                                    </Accordion>
                                                    {/* <Grid item sx={{display: "flex", justifyContent: "flex-end", mb: 3, }}>
                                                                        <Button onClick={() => { enabledAccordionId !== index
                                                                                                    ? handleEdit(index)
                                                                                                    : handleUpdateForm(form.getState().values.courtOrders);
                                                                                                }}
                                                                            variant="contained"
                                                                            sx={{ mr: 1 }}
                                                                        >
                                                                            {enabledAccordionId !== index
                                                                                ? "Edit"
                                                                                : "Update"}
                                                                        </Button>
                                                                    </Grid> */}
                                                                    <Grid item sx={{display: "flex", justifyContent: "flex-end", mb: 3, }}>
                                                                        <Button 
                                                                            variant="contained"
                                                                            color="primary"
                                                                            sx={{ mr: 1 }}
                                                                            onClick={() => {
                                                                                const updatedCourtOrders = form.getState().values.courtOrders.filter((_, i) => i !== index);
                                                                                form.change("courtOrders", updatedCourtOrders);
                                                                            }}
                                                                        >
                                                                            Remove
                                                                        </Button> 
                                                                    </Grid>
                                                    </Grid>
                                                    {/* <Grid item sm={1} style={{ marginTop: '10px' }}>
                                                        <RemoveIcon
                                                            variant="contained"
                                                            color="primary"
                                                            sx={{
                                                                margin: "auto",
                                                                display: "flex",
                                                                cursor: "pointer",
                                                            }}
                                                            onClick={() => {
                                                                // handleRemoveForm(index);
                                                                fields.remove(index)}
                                                            }
                                                        />
                                                </Grid> */}
                                            </Grid>
                                        </div>
                                    ))}
                                </Grid>
                            )}
                        </FieldArray>
                        <AddIcon
                            variant="contained"
                            color="primary"
                            sx={{
                                margin: "auto",
                                display: "flex",
                                mt: 3,
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                // const newIndex = form.getState().values.courtOrders.length;
                                form.change("courtOrders", [...form.getState().values.courtOrders, undefined,]); 
                                // setEnabledAccordionId(newIndex);
                            }}
                            // onClick={() => console.log(form.getState().values.courtOrders, form.getState().values)}
                        />
                        <Grid container sx={{my:3, }}>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={6}>
                                <input
                                    accept="application/pdf"
                                    type="file"
                                    label="Attach File"
                                    name="courtOrderFileAttachment"
                                    // multiple
                                    onChange={(e) =>
                                        setCourtOrderFileAttachment(e.target.files[0])
                                    }
                                />
                            </Grid>
                            <Grid>
                                <Button onClick={downloadPdf} disabled = {!courtOrderFileAttachment}>
                                        Download Already present pdf
                                    </Button>
                            </Grid>
                        </Grid>
                        <Box
                        sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
                    >
                        <Button onClick={onPrev} sx={{ mr: 1 }}>
                            <NavigateBeforeIcon fontSize="large" />
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={() => handleUpdateForm(form.getState().values.courtOrders)}
                        >
                            Update
                        </Button>
                        <Button color="primary" onClick={onNext}>
                            <NavigateNextIcon fontSize="large" />
                        </Button>
                    </Box>
                    <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to remove this form?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleConfirmationClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleRemoveConfirmation} color="primary">
                                Remove
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <Dialog sx={{ "& .MuiDialog-paper": {width:"30%"}, "& .MuiTypography-root": { fontSize:"1.5rem"}  }} open={updateConfirmationOpen} onClose={handleUpdateConfirmationClose}>
                        <DialogContent>
                            <DialogContentText>
                                Updated successfully!
                            </DialogContentText>
                        </DialogContent> 
                        <DialogActions>
                            <Button onClick={handleUpdateOkConfirmation} color="primary">
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>

                    </>
                )}
            />
        );
    },
    () => false
);

export default FourthStep;

