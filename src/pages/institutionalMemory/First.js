import React, { useCallback, useState, useContext, useEffect } from "react";
import { getBaseUrl } from "../../utils";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useWrit } from "./WritContext";

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
        
    } = useWrit();

    useEffect(() => {
        console.log('writDate updated in first.js:', writDate);
    }, [writDate]);



    const handleSubmit = async () => {
        try {
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
            
          const response = await fetch(getBaseUrl() + 'writ/addNewWrit', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: formData,
          });
          const responseData = await response.json();
          if (responseData.success) {
            console.log('Writ added successfully');
          } else {
            console.error('Failed to add writ: problem in backend', responseData.error);
          }
        } catch (error) {
          console.error('Error during the POST request: addwrit 1st', error);
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
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Writ Number"
                        name="writNumber"
                        placeholder="Write Writ Number"
                        value={writNumber}
                        onChange={(e) => setWritNumber(e.target.value)}
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
                    />
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Respondent Names"
                        name="writRespondentNames"
                        placeholder="Respondent Name"
                        value={writRespondentNames}
                        onChange={(e) => setWritRespondentNames(e.target.value)}
                    />
                </Grid> */}
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        SelectProps={{
                            native: true,
                        }}
                        label="Respondent Names"
                        name="writRespondentNames"
                        value={writRespondentNames}
                        onChange={(e) => setWritRespondentNames(e.target.value)}
                    >
                        <option value=""> </option>
                        <option value="Hemang">Hemang</option>
                        <option value="Deepanshu">Deepanshu</option>
                    </TextField>
                </Grid>
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

                <Grid item xs={12} sm={6} mt={4}></Grid>
                <Grid item xs={12} sm={6} mt={4}>
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