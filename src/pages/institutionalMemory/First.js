import React, { useCallback, useState, useContext, useEffect } from "react";
import { getBaseUrl } from "../../utils";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
// import ChipInput from 'material-ui-chip-input';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useWrit } from "./context/WritContext";
import CircularProgress from '@mui/material/CircularProgress';
import styles from "./WP.module.css";
import Backdrop from "@mui/material/Backdrop"; // Import Backdrop

export default function FirstStep({ onNext }) {
    const {
        writNumber, 
        setWritNumber,
        writDate,
        setWritDate,
        writPetitionerName,
        setWritPetitionerName,
        writRespondentNames,
        setWritRespondentNames,
        writPetitionerPrayer,
        setWritPetitionerPrayer,
        writCourtOrder,
        setWritCourtOrder,
        writDcComments,
        setWritDcComments,
        writPriority,
        setWritPriority,
        writFileAttachment,
        setWritFileAttachment,
        handleDownloadWritFileAttachment,
        writDepartment, setWritDepartment,

        isAddNew, setIsAddNew,
        loading, setLoading,
    } = useWrit();

    
    useEffect(() => {
        setLoading(false);
    }, []);

    // const [loading, setLoading] = useState(false);



    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (writNumber=='' || writDate == '' || writPetitionerName == '' || writRespondentNames==[]){
                alert("Please fill all required fields")
                return;
            }
          const formData = new FormData();
          formData.append('work', 'first');
          formData.append('writNumber', writNumber);
          formData.append('writDate', writDate);
          formData.append('writPetitionerName', writPetitionerName);
          formData.append('writRespondentNames', writRespondentNames);
          formData.append('writPetitionerPrayer', writPetitionerPrayer);
          formData.append('writCourtOrder', writCourtOrder);
          formData.append('writDcComments', writDcComments);
          formData.append('writPriority', writPriority);
          formData.append('writFileAttachment', writFileAttachment);
          formData.append('writDepartment', writDepartment);
          formData.append('isAddNew', isAddNew);
            
          const response = await fetch(getBaseUrl() + 'writ/addNewWrit', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: formData,
          });
          const responseData = await response.json();
          if (responseData.success) {
            alert('Writ Data has been uploaded successfully');
            console.log('Writ added successfully');
          } 
          else {
            alert('Some error has occured: '+ responseData.error);
            console.error('Failed to add writ: ', responseData.error);
          }
        } catch (error) {
          console.error('Error during the POST request: addwrit 1st', error);
        } finally {
            setLoading(false);
        }
      };
      
      const downloadPdf = async () => {
        try {
            const response = await fetch(getBaseUrl() + 'writ/downloadPdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ writNumber, writFileAttachment }),
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
        <>
            {/* <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop> */}
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <TextField
                        fullWidth
                        label="Writ Number"
                        name="writNumber"
                        placeholder="Write Writ Number"
                        value={writNumber}
                        onChange={(e) => setWritNumber(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Writ Date"
                        type="date"
                        name="writDate"
                        placeholder="Date of Writ"
                        value={writDate}
                        onChange={(e) => setWritDate(e.target.value)}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Petitioner Name"
                        name="writPetitionerName"
                        placeholder="Write Petitioner Name"
                        value={writPetitionerName}
                        onChange={(e) => setWritPetitionerName(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        multiple
                        SelectProps={{
                            native: true,
                        }}
                        label="Respondent Names"
                        name="writRespondentNames"
                        value={writRespondentNames}
                        onChange={(e) => setWritRespondentNames(e.target.value)}
                        required
                    >
                        <option value=""> </option>
                        <option value="Hemang">Hemang</option>
                        <option value="Deepanshu">Deepanshu</option>
                    </TextField>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <ChipInput
                        fullWidth
                        label="Respondent Names"
                        value={writRespondentNames}
                        onAdd={(chip) => setWritRespondentNames([...writRespondentNames, chip])}
                        onDelete={(chip, index) => {
                            const newRespondentNames = [...writRespondentNames];
                            newRespondentNames.splice(index, 1);
                            setWritRespondentNames(newRespondentNames);
                        }}
                        blurBehavior="clear"
                        required
                    />
                </Grid> */}

                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        SelectProps={{
                            native: true,
                        }}
                        label="Priority"
                        name="Priority"
                        value={writPriority}
                        onChange={(e) => setWritPriority(e.target.value)}
                    >
                        <option value=""> </option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Department"
                        name="writDepartment"
                        placeholder="Department"
                        value={writDepartment}
                        onChange={(e) => setWritDepartment(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Petitioner's Prayer"
                        name="writPetitionerPrayer"
                        placeholder="Petitioner's Prayer"
                        type="text"
                        value={writPetitionerPrayer}
                        onChange={(e) =>
                            setWritPetitionerPrayer(e.target.value)
                        }
                        multiline
                        rows={3}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Court Order"
                        name="writCourtOrder"
                        placeholder="Court Order"
                        type="text"
                        value={writCourtOrder}
                        onChange={(e) => setWritCourtOrder(e.target.value)}
                        multiline
                        rows={3}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="DC Comments"
                        name="writDcComments"
                        placeholder="DC Comments"
                        type="writDcComments"
                        value={writDcComments}
                        onChange={(e) => setWritDcComments(e.target.value)}
                        multiline
                        rows={2}
                    />
                </Grid>

                <Grid item xs={0} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                    <input
                        accept="application/pdf"
                        type="file"
                        label="Attach File"
                        name="writFileAttachment"
                        onChange={(e) =>
                            setWritFileAttachment(e.target.files[0])
                        }
                    />
                    {writFileAttachment && (
                        <Button
                            variant="text"
                            onClick={handleDownloadWritFileAttachment}
                        >
                            {writFileAttachment.name}
                        </Button>
                    )}
                </Grid>
                <Grid> 
                    <Button onClick={downloadPdf} disabled = {!writFileAttachment}>
                        Download Already present pdf
                    </Button>
                </Grid>
            </Grid>

            <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}
            >
                <Button></Button>
                <Button
                    variant="contained"
                    sx={{ mr: 1 }}
                    onClick={handleSubmit}
                >
                    Update
                </Button>
                <Button
                    color="primary"
                    onClick={() => {
                        onNext();
                    }}
                >
                    <NavigateNextIcon fontSize="large" />
                </Button>
            </Box>
        </>
    );
}