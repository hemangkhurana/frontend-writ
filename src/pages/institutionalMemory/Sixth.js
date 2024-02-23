import React, { useCallback, useState, useContext, useEffect } from "react";
import { useWrit } from "./context/WritContext";
import { Grid, FormControlLabel, Checkbox, Button, Box, TextField, } from "@mui/material";
import { getBaseUrl } from "../../utils";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function SixthStep({onPrev}) {
    const { writNumber,
            writClose, setWritClose,
            writCloseDate, setWritCloseDate,
            loading, setLoading,
            } = useWrit();

    useEffect(() => {
        setLoading(false);
    }, []);
    
    const handleSubmit = async() => {
        setLoading(true);
        try {
            if (writCloseDate == '' || writClose == false){
                alert("Please fill all required fields")
                return;
            }
            const formData = new FormData();
            formData.append('writNumber', writNumber);
            formData.append('work', 'sixth');
            formData.append('writClose', writClose);
            formData.append('writCloseDate', writCloseDate);
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
                console.log('Sixth step successful');
              } else {
                alert('Some error has occured');
                console.error('Failed: problem in backend', responseData.error);
              }
        } catch (error) {
            console.log('Error sending data', error);
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        label="Writ Close Date"
                        name="writCloseDate"
                        type="date"
                        defaultValue={writCloseDate}
                        onChange={(e) => setWritCloseDate(e.target.value)}
                        required
                    />
                </Grid>
                <Grid item xs={6} sx={{ display:'flex', alignItems:'center', }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={writClose}
                                onChange={(e) => setWritClose(e.target.checked)}
                                color="primary"
                                required
                            />
                        }
                        label="Close"
                    />
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
                <Button></Button>
            </Box>
        </>
    )
}