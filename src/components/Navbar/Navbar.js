import React from "react";
// import {  } from "@fortawesome/react-fontawesome";
import { GrSchedules, GrTask } from "react-icons/gr";
import { AiFillHome } from "react-icons/ai";
import {
  FaBalanceScale,
  FaCalendarAlt,
  FaFileAlt,
  FaSearch,
  FaClipboard,
  FaClipboardCheck,
  FaClipboardList
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"
import SendIcon from '@mui/icons-material/Send';


export const Navbar = () => {
  const links = [
    { name: 'Add Writ', route : "", icon: <FaClipboard size={40}/>}, 
  ];
  return (
    <nav className={styles.navbarContainer}>
      {/* <nav style={{ margin: "0px", width: "100%", padding: "0px", }}> */}
      {links.map((item, index) => {
        return (
          <NavLink
            to={"/user/" + item.route}
            style={{ margin: "20px 0px", padding: "0px" }}
            className={({ isActive, isPending }) =>
              isActive ? "nav-link" : "nav-link-inactive"
            }
          >
            <div className={styles.iconContainer}>
              {item.icon}
            </div>
            <div className={styles.nameContainer}>
              {item.name}
            </div>
          </NavLink>
        );
      })}
    </nav>
  );
};
