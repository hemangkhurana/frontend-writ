import React, { useCallback, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { getBaseUrl } from "../../utils";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useWrit } from "./WritContext";

export default function FifthStep({ onPrev, onNext }) {
    //   const [writNumber, setWritNumber] = useState([]);
    const {
        writNumber,
        setWritNumber,
        contemptDate,
        setContemptDate,
        contemptText,
        setContemptText,
        contemptDcComments,
        setContemptDcComments,
        contemptFileAttachment,
        setContemptFileAttachment,
        handleDownloadContemptFileAttachment,
    } = useWrit();


    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('work', 'fifth');
            formData.append('writNumber', writNumber);
            formData.append('contemptDate', contemptDate);
            formData.append('contemptText', contemptText);
            formData.append('contemptDcComments', contemptDcComments);
            formData.append('contemptFileAttachment', contemptFileAttachment);
            console.log(formData);
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
                body: JSON.stringify({ writNumber, contemptFileAttachment }),
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
                        required={writNumber.required}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Date of Contempt"
                        name="contemptDate"
                        type="date"
                        defaultValue={contemptDate}
                        onChange={(e) => setContemptDate(e.target.value)}
                        required={contemptDate.required}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Contempt"
                        name="contemptText"
                        placeholder="Contempt"
                        type="text"
                        value={contemptText}
                        onChange={(e) => setContemptText(e.target.value)}
                        required={contemptText.required}
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="DC Comments"
                        name="contemptDcComments"
                        placeholder="DC Comments"
                        type="contemptDcComments"
                        value={contemptDcComments}
                        onChange={(e) => setContemptDcComments(e.target.value)}
                        required={contemptDcComments.required}
                        multiline
                        rows={2}
                    />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
                <Grid item xs={12} sm={6}>
                    <input
                        accept="application/pdf"
                        type="file"
                        label="Attach File"
                        name="contemptFileAttachment"
                        onChange={(e) =>
                            setContemptFileAttachment(e.target.files[0])
                        }
                    />
                    {contemptFileAttachment && (
                        <Button
                            variant="text"
                            onClick={handleDownloadContemptFileAttachment}
                        >
                            {contemptFileAttachment.name}
                        </Button>
                    )}
                </Grid>

                <Grid>
                    <Button onClick={downloadPdf} disabled = {!contemptFileAttachment}>
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
                <Button variant="contained" sx={{ mr: 1 }} onClick={handleSubmit}>
                    Update
                </Button>
                <Button color="primary" onClick={() => {onNext(); }}>
                    <NavigateNextIcon fontSize="large" />
                </Button>
            </Box>
        </>
    );
}