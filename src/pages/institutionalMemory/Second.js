import React, { useCallback, useContext, useState } from "react";
import Grid from "@mui/material/Grid";
import { getBaseUrl } from "../../utils";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import { useWrit } from "./WritContext";

export default function SecondStep({ onPrev, onNext }) {
    // const [writNumber, setWritNumber] = useState([]);
    const {
        writNumber,
        setWritNumber,
        remarkDate,
        setRemarkDate,
        paraRemark,
        setParaRemark,
        remarkDcComments,
        setRemarkDcComments,
        remarkFileAttachment,
        setRemarkFileAttachment,
        handleDownloadRemarkFileAttachment,
    } = useWrit();


    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('work', 'second');
            formData.append('writNumber', writNumber);
            formData.append('remarkDate', remarkDate);
            formData.append('paraRemark', paraRemark);
            formData.append('remarkDcComments', remarkDcComments);
            formData.append('remarkFileAttachment', remarkFileAttachment);
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
                body: JSON.stringify({ writNumber, remarkFileAttachment }),
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
                        label="Date of Remark"
                        name="remarkDate"
                        type="date"
                        defaultValue={remarkDate}
                        onChange={(e) => setRemarkDate(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="Para wise remark"
                        name="paraRemark"
                        placeholder="Para Wise Remark"
                        type="text"
                        value={paraRemark}
                        onChange={(e) => setParaRemark(e.target.value)}
                        multiline
                        rows={3}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        fullWidth
                        label="DC Comments"
                        name="remarkDcComments"
                        placeholder="DC Comments"
                        type="text"
                        value={remarkDcComments}
                        onChange={(e) => setRemarkDcComments(e.target.value)}
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
                        name="remarkFileAttachment"
                        onChange={(e) =>
                            setRemarkFileAttachment(e.target.files[0])
                        }
                    />
                    {remarkFileAttachment && (
                        <Button
                            variant="text"
                            onClick={handleDownloadRemarkFileAttachment}
                        >
                            {remarkFileAttachment.name}
                        </Button>
                    )}
                </Grid>
                <Grid>
                    <Button onClick={downloadPdf} disabled = {!remarkFileAttachment}>
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
                <Button
                    // disabled={isError()}
                    color="primary"
                    // onClick={!isError() ? onNext : () => null}
                    onClick={onNext}
                >
                    <NavigateNextIcon fontSize="large" />
                </Button>
            </Box>
        </>
    );
}