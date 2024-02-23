import React, {useContext} from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import StepForm from './StepForm';
import { WritProvider } from "./context/WritContext";
import { headerNavbarWrapper } from "../../components/MainPage/headerNavbarWrapper";
const AddWP = () => {
    const theme = createTheme()
    return (
        <>
            <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
                <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>        
                    {/* <WritProvider> */}
                        <StepForm />
                    {/* </WritProvider> */}
                </Paper>
            </Container>
            </ThemeProvider>
        </>
    );
};

export default headerNavbarWrapper(AddWP);