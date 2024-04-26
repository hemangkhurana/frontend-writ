import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import FirstStep from "./First";
import SecondStep from "./Second";
import ThirdStep from "./Third";
import FourthStep from "./Fourth";
import FifthStep from "./Fifth";
import SixthStep from "./Sixth";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useWrit } from "./context/WritContext";


// Step titles
const labels = [
    "Add Writ",
    "Para wise remark",
    "Counter",
    "Court Order",
    "Contempt",
    "Close",
];

export default function StepForm() {
    const {
        loading, setLoading,
    } = useWrit();
    
    const [step, setStep] = useState(0);
    const [writ, setWrit] = useState(0);
    const nextStep = () => {
        setStep(step + 1);
        setLoading(true);
    };

    const prevStep = () => {
        setStep(step - 1);
        setLoading(true);
    };

    const handleStepClick = (index) => {
        setStep(index);
        setLoading(true);
    };

    const handleSteps = (step) => {
        switch (step) {
            case 0:
                return <FirstStep onNext={nextStep} />;
            case 1:
                return <SecondStep onPrev={prevStep} onNext={nextStep} />;
            case 2:
                return <ThirdStep onPrev={prevStep} onNext={nextStep} />;
            case 3:
                return <FourthStep onPrev={prevStep} onNext={nextStep} />;
            case 4:
                return <FifthStep onPrev={prevStep} onNext={nextStep} />;
            case 5:
                return <SixthStep onPrev={prevStep} onSubmit={handleSubmit} />;
            default:
                throw new Error("Unknown step");
        }
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log("Form submitted!");
    };


    return (
        <>
            <Box sx={{ my: 3 }}>
                <Link to="/user/wp">
                    <Button
                        color="inherit"
                        aria-label="close"
                        sx={{ position: "absolute", }}
                    >
                        <CloseIcon />
                    </Button>
                </Link>
                <Typography variant="h4" align="center">
                    Add Writ
                </Typography>
            </Box>
            <Stepper sx={{my:3}} activeStep={step} alternativeLabel>
                {labels.map((label, index) => (
                    <Step
                        key={label}
                        onClick={() => handleStepClick(index)}
                    >
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {handleSteps(step)}
        </>
    );
}
