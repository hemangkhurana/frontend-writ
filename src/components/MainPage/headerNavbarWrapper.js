import React from "react";
import { Header } from "../Header/Header";
import { Navbar } from "../Navbar/Navbar";

import styles from "./MainPage.module.css"
import { Divider } from "@mui/material";

export const headerNavbarWrapper = (componentToRender) => (props) => {
  return (
    <div>
      <Header />
      <div className={`row ${styles.div2}`}>
        <Navbar />
        <div className={`col ${styles.contentDiv}`}>
            {componentToRender(props)}
        </div>
      </div>
    </div>
  );
};
