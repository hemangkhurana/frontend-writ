import React, { useCallback, useContext, useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { getBaseUrl } from "../../utils";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useWrit } from "./context/WritContext";

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
        loading, setLoading,
    } = useWrit();

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (writNumber =='' || contemptDate == ''){
                alert("Please fill all required fields");
                return;
            }
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
                alert('Writ Data has been uploaded successfully');
                console.log('Writ added successfully');
              } else {
                alert('Some error has occured');
                console.error('Failed to add writ: problem in backend', responseData.error);
              }
            } catch (error) {
              console.error('Error during the POST request: addwrit 1st', error);
            }
            finally{
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
                body: JSON.stringify({ writNumber, contemptFileAttachment }),
            });
            if (!response.ok) {
                alert('Unable to download pdf, some error has occured');
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
                        disabled
                        required
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
                        required
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
