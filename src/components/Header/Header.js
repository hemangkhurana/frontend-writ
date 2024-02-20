import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import styles from './Header.module.css';

export const Header = () => {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = React.useState(false)

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const changeToggleMenu = () => {
      return setToggleMenu(!toggleMenu);
  }

  return (
    <>
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <IconButton size="large" edge="start" color="inherit" onClick={changeToggleMenu}>
          {toggleMenu ? <CloseIcon/> : <MenuIcon/> }
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img src="/Logo.svg" alt="Logo Img Not Found" className={styles.logoImg}/>
          <img src="/Logo-1.png" alt="Logo 1 Img not found" className={styles.logo1Img}/>
        </Typography>
        <IconButton size="large" edge="end" color="inherit">
          <FaUserCircle size={30} color="white" />
        </IconButton>
        <Typography variant="h6" sx={{ fontSize: 20, color: "white", marginLeft: 2 }}>
          {localStorage.getItem("username")}
        </Typography>
        <IconButton className={styles.logoutButton} size="large" edge="end" color="inherit">
          <LogoutIcon onClick={logout}/>
        </IconButton>
      </Toolbar>
    </AppBar>
    <div className={`${styles.nav} ${toggleMenu ? styles.active : ''}`}>
      <Navbar/>
    </div>
    </>
  );
};
