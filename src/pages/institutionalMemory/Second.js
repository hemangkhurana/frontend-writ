import React, { useCallback, useContext, useState, useEffect } from "react";
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
import { useWrit } from "./context/WritContext";

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
        loading, setLoading,

    } = useWrit();

    useEffect(() => {
        setLoading(false);
    }, []);


    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (writNumber == '' || remarkDate == ''){
                alert("Please fill all required fields")
                return;
            }
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
                alert('Writ Data has been uploaded successfully');
                console.log('Writ added successfully');
              } else {
                alert('Some error has occured');
                console.error('Failed to add writ: problem in backend', responseData.error);
              }
            } catch (error) {
              console.error('Error during the POST request: addwrit 1st', error);
            }
            finally {
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
                body: JSON.stringify({ writNumber, remarkFileAttachment }),
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
            <Grid container spacing={2}>
                <Grid item sm={6}>
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
                        label="Date of Remark"
                        name="remarkDate"
                        type="date"
                        defaultValue={remarkDate}
                        onChange={(e) => setRemarkDate(e.target.value)}
                        required
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

                <Grid item xs={0} sm={6}></Grid>
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
                    {/* {remarkFileAttachment && (
                        <Button
                            variant="text"
                            onClick={handleDownloadRemarkFileAttachment}
                        >
                            {remarkFileAttachment.name}
                        </Button>
                    )} */}
                </Grid>
                <Grid>
                    <Button onClick={downloadPdf} disabled = {!remarkFileAttachment}>
                            Download Already present pdf : {remarkFileAttachment.name}
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