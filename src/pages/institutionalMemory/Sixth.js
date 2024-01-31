import React from 'react';
import { useWrit } from "./WritContext";
import { Grid, FormControlLabel, Checkbox, Button, Box, TextField, } from "@mui/material";
import { getBaseUrl } from "../../utils";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export default function SixthStep({onPrev}) {
    const { writNumber,
            writClose, setWritClose,
            writCloseDate, setWritCloseDate,
            } = useWrit();
    
    const handleSubmit = async() => {
        try {
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
                console.log('Sixth step successful');
              } else {
                console.error('Failed: problem in backend', responseData.error);
              }
        } catch (error) {
            console.log('Error sending data', error);
        }
        console.log("Hemang");
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
                    />
                </Grid>
                <Grid item xs={6} sx={{ display:'flex', alignItems:'center', }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={writClose}
                                onChange={(e) => setWritClose(e.target.checked)}
                                color="primary"
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