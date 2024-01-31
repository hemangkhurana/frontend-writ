import React from "react";
import styles from "./Header.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  // console.log(localStorage.getItem('u'));
  const navigate = useNavigate();
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };
  return (
    <div className={styles.headerContainer}>
      <div className={styles.logoContainer}>
        {/* <span className={styles.logoSpan}> */}
          <img className={styles.logoImg} src="/Logo.svg" alt="" />
          <img className={styles.logo1Img} src="/Logo-1.png" alt=""/>
        {/* </span> */}
      </div>
      <div className={styles.rightContainer}>
        {/* <img src='/Logo.svg' style={{height:'100%', filter:'invert(100%)'}}/> */}
        <FaUserCircle size={30} color="white" />
        <span style={{ fontSize: "20px", color: "white", marginLeft: "10px" }}>
          {localStorage.getItem("username")}
        </span>
        <button className={styles.logoutBtn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
