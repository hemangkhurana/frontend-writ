import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "../Header/Header";
import { Navbar } from "../Navbar/Navbar";

import styles from "./MainPage.module.css"
import { headerNavbarWrapper } from "./headerNavbarWrapper.js";

const MainPage = () => {
  return null;
  return (
    <div>
      <Header />
      <div className={`row ${styles.div2}`}>
        <Navbar />
        <div className={`col ${styles.contentDiv}`}></div>
      </div>
    </div>
  );
};

export default headerNavbarWrapper(MainPage);